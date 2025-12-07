import React from 'react';
import { X, Settings, Save, Trash2, AlertTriangle } from 'lucide-react';
import { Config } from '../types';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: Config;
  onConfigChange: (field: keyof Config, value: string) => void;
  onReset: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose, config, onConfigChange, onReset }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 transition-all">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Settings className="text-blue-600" size={20}/> 
            Pengaturan Data Sekolah
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-slate-200">
            <X size={20}/>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 tracking-wider">Nama Sekolah</label>
              <input 
                type="text" 
                value={config.schoolName} 
                onChange={(e) => onConfigChange('schoolName', e.target.value)} 
                className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 tracking-wider">Mata Pelajaran</label>
              <input 
                type="text" 
                value={config.subject} 
                onChange={(e) => onConfigChange('subject', e.target.value)} 
                className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 tracking-wider">Kelas / Fase</label>
                <input 
                  type="text" 
                  value={config.phase} 
                  onChange={(e) => onConfigChange('phase', e.target.value)} 
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 tracking-wider">Tahun Ajar</label>
                <input 
                  type="text" 
                  value={config.year} 
                  onChange={(e) => onConfigChange('year', e.target.value)} 
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 tracking-wider">Nama Guru</label>
              <input 
                type="text" 
                value={config.teacherName} 
                onChange={(e) => onConfigChange('teacherName', e.target.value)} 
                className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 tracking-wider">Nama Kepala Sekolah</label>
              <input 
                type="text" 
                value={config.headmasterName} 
                onChange={(e) => onConfigChange('headmasterName', e.target.value)} 
                className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
             <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h4 className="flex items-center gap-2 text-red-700 font-bold text-sm mb-2">
                  <AlertTriangle size={16}/> Zona Bahaya
                </h4>
                <p className="text-xs text-red-600 mb-3">
                  Tindakan ini akan menghapus semua data yang tersimpan di browser (nama siswa, nilai, dan pengaturan) dan mengembalikan aplikasi ke kondisi awal.
                </p>
                <button 
                  onClick={onReset}
                  className="w-full border border-red-200 bg-white text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} /> Reset Data Aplikasi
                </button>
             </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose} 
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95"
          >
            <Save size={18}/> Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};