import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from "react-router-dom";

const LiquidGlassEffect = ({ targetRef }) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !targetRef.current) return;

    const navElement = targetRef.current;
    let shaderInstance = null;

    const liquidGlassFactory = (container) => {
      const smoothStep = (a, b, t) => {
        t = Math.max(0, Math.min(1, (t - a) / (b - a)));
        return t * t * (3 - 2 * t);
      };
      const length = (x, y) => Math.sqrt(x * x + y * y);
      const roundedRectSDF = (x, y, width, height, radius) => {
        const qx = Math.abs(x) - width + radius;
        const qy = Math.abs(y) - height + radius;
        return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
      };
      const texture = (x, y) => ({ type: 't', x, y });
      const generateId = () => 'liquid-glass-' + Math.random().toString(36).substr(2, 9);

      class Shader {
        constructor(el) {
          this.container = el;
          this.id = generateId();
          this.mouse = { x: 0, y: 0 };
          
          const rect = this.container.getBoundingClientRect();
          this.width = rect.width;
          this.height = rect.height;

          this.createElements();
          this.setupEventListeners();
          this.updateShader();
        }

        createElements() {
          this.container.style.backdropFilter = `url(#${this.id}_filter)`;

          this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          this.svg.setAttribute('width', '0');
          this.svg.setAttribute('height', '0');
          this.svg.style.cssText = `position: fixed; top: 0; left: 0; pointer-events: none; z-index: -1;`;

          const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
          filter.setAttribute('id', `${this.id}_filter`);
          filter.setAttribute('filterUnits', 'userSpaceOnUse');
          filter.setAttribute('colorInterpolationFilters', 'sRGB');

          this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
          this.feImage.setAttribute('id', `${this.id}_map`);
          this.feImage.setAttribute('width', this.width);
          this.feImage.setAttribute('height', this.height);
          this.feImage.setAttribute('result', 'map');

          this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
          this.feDisplacementMap.setAttribute('in', 'SourceGraphic');
          this.feDisplacementMap.setAttribute('in2', 'map');
          this.feDisplacementMap.setAttribute('scale', '0');
          this.feDisplacementMap.setAttribute('xChannelSelector', 'R');
          this.feDisplacementMap.setAttribute('yChannelSelector', 'G');
          
          const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
          feGaussianBlur.setAttribute('in', 'SourceGraphic');
          feGaussianBlur.setAttribute('stdDeviation', '15');
          feGaussianBlur.setAttribute('result', 'blurred');
          
          const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
          feComposite.setAttribute('in', 'blurred');
          feComposite.setAttribute('in2', this.feDisplacementMap.getAttribute('id'));
          feComposite.setAttribute('operator', 'atop');

          filter.appendChild(feGaussianBlur);
          filter.appendChild(this.feImage);
          filter.appendChild(this.feDisplacementMap);
          defs.appendChild(filter);
          this.svg.appendChild(defs);

          this.canvas = document.createElement('canvas');
          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.canvas.style.display = 'none';

          this.context = this.canvas.getContext('2d');
          
          document.body.appendChild(this.svg);
          document.body.appendChild(this.canvas);
        }

        setupEventListeners() {
          this.mouseMoveHandler = (e) => {
          };
          window.addEventListener('mousemove', this.mouseMoveHandler);

          this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                this.width = width;
                this.height = height;
                this.canvas.width = width;
                this.canvas.height = height;
                this.feImage.setAttribute('width', width);
                this.feImage.setAttribute('height', height);
                this.updateShader();
            }
          });
          this.resizeObserver.observe(this.container);
        }

        updateShader() {
          const w = this.width;
          const h = this.height;
          if (w === 0 || h === 0) return;

          const data = this.context.createImageData(w, h);
          const pixels = data.data;
          
          let maxScale = 0;
          const rawValues = [];

          for (let i = 0; i < pixels.length; i += 4) {
            const x = (i / 4) % w;
            const y = Math.floor((i / 4) / w);
            
            const uv = { x: x / w, y: y / h };
            const ix = uv.x - 0.5;
            const iy = uv.y - 0.5;
            
            const distanceToEdge = roundedRectSDF(ix, iy, 0.5, 0.5, 0.25);
            
            const borderEffect = 1.0 - smoothStep(0.0, 0.08, Math.abs(distanceToEdge));
            
            const normalX = ix === 0 && iy === 0 ? 0 : ix / length(ix, iy);
            const normalY = ix === 0 && iy === 0 ? 0 : iy / length(ix, iy);

            const pushStrength = 0.03;

            const displacementX = normalX * borderEffect * pushStrength;
            const displacementY = normalY * borderEffect * pushStrength;

            const pos = texture(uv.x + displacementX, uv.y + displacementY);
            
            const dx = pos.x * w - x;
            const dy = pos.y * h - y;
            maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
            rawValues.push(dx, dy);
          }

          let index = 0;
          for (let i = 0; i < pixels.length; i += 4) {
            const r = maxScale === 0 ? 0.5 : (rawValues[index++] / maxScale) * 0.5 + 0.5;
            const g = maxScale === 0 ? 0.5 : (rawValues[index++] / maxScale) * 0.5 + 0.5;
            pixels[i]     = r * 255;
            pixels[i + 1] = g * 255;
            pixels[i + 2] = 0;
            pixels[i + 3] = 255;
          }

          this.context.putImageData(data, 0, 0);
          this.feImage.setAttributeNS('http:www.w3.org/1999/xlink', 'href', this.canvas.toDataURL());
          this.feDisplacementMap.setAttribute('scale', maxScale.toString());
        }

        destroy() {
          window.removeEventListener('mousemove', this.mouseMoveHandler);
          this.resizeObserver.disconnect();
          this.svg.remove();
          this.canvas.remove();
          if (this.container) {
            this.container.style.backdropFilter = 'none';
          }
        }
      }
      
      return new Shader(container);
    };

    shaderInstance = liquidGlassFactory(navElement);

    return () => {
      if (shaderInstance) {
        shaderInstance.destroy();
      }
    };
  }, [targetRef]);

  return null;
};


const Navbar = ({ user, logout }) => {
  const navRef = useRef(null);

  const subjects = [
    { id: "dsa", name: "DSA", path: "/dsa" },
    { id: "wap", name: "WAP", path: "/wap" },
    { id: "maths", name: "Maths", path: "/maths" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav ref={navRef} className="bg-gray-900/40 border border-white/10 rounded-[1.75rem] shadow-lg">
        <LiquidGlassEffect targetRef={navRef} />
        
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="/Thinkify_logo.png" width={40} height={40} alt="Thinkify Logo" />
              <h1 className="text-xl font-bold text-white">Thinkify</h1>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {subjects.map((subject) => (
                <NavLink
                  key={subject.id}
                  to={subject.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors pb-1 ${
                      isActive
                        ? "text-teal-400 border-b-2 border-teal-400"
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {subject.name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm text-gray-300">{user.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
