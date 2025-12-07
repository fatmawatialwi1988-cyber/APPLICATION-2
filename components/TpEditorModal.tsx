import React from 'react';
import { X, Edit3, Trash2, Plus, Info, Check } from 'lucide-react';
import { TP } from '../types';

interface TpEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  tps: TP[];
  onTpChange: (index: number, field: keyof TP, value: string) => void;
  onAddTp: () => void;
  onRemoveTp: (index: number) => void;
}

export const TpEditorModal: React.FC<TpEditorModalProps> = ({ 
  isOpen, 
  onClose, 
  tps, 
  onTpChange, 
  onAddTp, 
  onRemoveTp 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 transition-all">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Edit3 className="text-indigo-600" size={20}/> 
            Editor Tujuan Pembelajaran (TP)
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-slate-200">
            <X size={20}/>
          </button>
        </div>

        <div className="p-5 flex-shrink-0 bg-yellow-50 border-b border-yellow-100">
          <div className="flex items-start gap-3 text-sm text-yellow-800">
             <Info className="flex-shrink-0 mt-0.5" size={16}/>
             <p>
               <strong>Perhatian:</strong> Menghapus baris TP akan menghapus seluruh data nilai siswa yang terkait dengan kolom tersebut secara permanen. 
               Mengedit label atau deskripsi tidak akan mempengaruhi nilai.
             </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50">
          <div className="space-y-3">
            {tps.map((tp, index) => (
              <div key={tp.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-start relative group hover:border-blue-300 transition-colors">
                
                <div className="md:col-span-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Kode</label>
                  <input 
                    type="text" 
                    value={tp.code} 
                    onChange={(e) => onTpChange(index, 'code', e.target.value)} 
                    className="w-full border border-slate-200 bg-slate-50 p-2 rounded text-sm font-medium focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                
                <div className="md:col-span-3">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Label Singkat</label>
                  <input 
                    type="text" 
                    value={tp.label} 
                    onChange={(e) => onTpChange(index, 'label', e.target.value)} 
                    className="w-full border border-slate-200 p-2 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="Contoh: Reading Text"
                  />
                </div>
                
                <div className="md:col-span-7">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Deskripsi Lengkap</label>
                  <textarea 
                    rows={1} 
                    value={tp.desc} 
                    onChange={(e) => onTpChange(index, 'desc', e.target.value)} 
                    className="w-full border border-slate-200 p-2 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Deskripsi detail untuk tooltip..."
                  />
                </div>
                
                <div className="md:col-span-1 flex justify-center items-center h-full pt-4 md:pt-0">
                  <button 
                    onClick={() => onRemoveTp(index)} 
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                    title="Hapus TP"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 bg-white flex justify-between items-center gap-4">
           <button 
             onClick={onAddTp} 
             className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-4 py-2 rounded-lg font-semibold transition-colors border border-indigo-200 border-dashed"
           >
             <Plus size={18}/> Tambah Kolom TP Baru
           </button>
           
           <button 
             onClick={onClose} 
             className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg hover:bg-indigo-700 font-semibold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95"
           >
             <Check size={18}/> Selesai & Simpan
           </button>
        </div>
      </div>
    </div>
  );
};