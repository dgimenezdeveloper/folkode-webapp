
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter } from 'lucide-react';
import { Category } from '../types';

interface ProjectFiltersProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (value: string) => void;
}

export const ProjectFilterBtnMobile: React.FC<ProjectFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLabel = categories.find(c => c.value === activeCategory)?.label || 'Todos';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-center !mb-0">
      {/* Mobile Dropdown View */}
      <div className="md:hidden w-full max-w-xs relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center !py-4 btn-gradient border-1 border-[#003d5b] rounded-2xl text-white shadow-xl focus:outline-none transition-all hover:border-primary/50"
        >
          <div className="w-full flex items-center !px-5">
            <Filter size={18} className="text-primary" />
            <span className="!h-fit flex-1 font-semibold">{activeLabel}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </div>

        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 5, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute z-99 w-full bg-[#161b22] border-2 border-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-opacity-95"
            >
              <div className="!py-2 flex flex-col">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      onCategoryChange(cat.value);
                      setIsOpen(false);
                    }}
                    className={`!px-6 !py-3 text-left transition-colors flex items-center justify-between ${activeCategory === cat.value
                      ? 'bg-primary/10 text-[#a3b18a] font-bold'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {cat.label}
                    {activeCategory === cat.value && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Button Row View */}
      <div className="hidden md:flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 border-2 ${activeCategory === cat.value
              ? 'btn-gradient border-transparent shadow-[0_0_20px_rgba(134,168,105,0.4)]'
              : 'bg-surface border-border text-zinc-400 hover:border-primary/50 hover:text-white'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
