import React, { useState, useMemo } from 'react';
import { Download, Plus, Trash2, BookOpen, Settings, Edit3, Info, User, FileSpreadsheet } from 'lucide-react';
import { TP, Student, Config, IntervalStatus } from './types';
import { ConfigModal } from './components/ConfigModal';
import { TpEditorModal } from './components/TpEditorModal';

const App = () => {
  // =========================================
  // STATE
  // =========================================
  const [config, setConfig] = useState<Config>({
    schoolName: "SMP NEGERI SATAP 3 BANAWA TENGAH",
    teacherName: "FATMAWATI, S.Pd.,M.Pd",
    headmasterName: "FATMI, S.Pd, M.Pd",
    subject: "Bahasa Inggris",
    phase: "Kelas VIII (Semester Ganjil)",
    year: "2025/2026"
  });

  const [tps, setTps] = useState<TP[]>([
    { id: 'tp1_1', code: '1.1', label: 'Kosakata HUT RI', desc: 'Mengidentifikasi kosakata perayaan Kemerdekaan & dialog pengalaman masa lalu' },
    { id: 'tp1_2', code: '1.2', label: 'Past Verbs', desc: 'Identifikasi informasi spesifik & klasifikasi kata kerja lampau (regular/irregular)' },
    { id: 'tp1_3', code: '1.3', label: 'Pengalaman Pribadi', desc: 'Bertanya dan menjawab tentang pengalaman pribadi masa lalu' },
    { id: 'tp1_4', code: '1.4', label: 'Recount Text', desc: 'Membaca dan memahami informasi rinci recount text pawai kemerdekaan' },
    { id: 'tp1_5', code: '1.5', label: 'Time Connectives', desc: 'Memahami fungsi time connectives untuk urutan peristiwa' },
    { id: 'tp1_6', code: '1.6', label: 'Struktur Recount', desc: 'Menganalisis struktur recount text & merencanakan kerangka tulisan' },
    { id: 'tp1_7', code: '1.7', label: 'Menulis Recount', desc: 'Menulis recount text sederhana & menyajikan dalam tulisan/komik' },
    { id: 'tp2_1', code: '2.1', label: 'Urutan Cerita', desc: 'Menghubungkan dan mengurutkan kejadian cerita imajinatif (Ugly Duckling)' },
    { id: 'tp2_2', code: '2.2', label: 'Retelling', desc: 'Menceritakan kembali (retell) bagian cerita imajinatif secara lisan' },
    { id: 'tp2_3', code: '2.3', label: 'Karakter', desc: 'Menjelaskan tindakan, perasaan, dan perilaku karakter cerita' },
    { id: 'tp2_4', code: '2.4', label: 'Elemen Naratif', desc: 'Menganalisis orientasi, komplikasi, resolusi teks naratif' },
    { id: 'tp2_5', code: '2.5', label: 'Menulis Cerita', desc: 'Merancang dan menulis cerita imajinatif sederhana' },
  ]);

  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: 'Andi Saputra', 
      scores: { tp1_1: 85, tp1_2: 80, tp1_3: 78, tp1_4: 82, tp1_5: 75, tp1_6: 80, tp1_7: 85, tp2_1: 88, tp2_2: 85, tp2_3: 82, tp2_4: 80, tp2_5: 78, tp3_1: 85, tp3_2: 88, tp3_3: 82, tp3_4: 80, tp3_5: 85, tp3_6: 88 } 
    },
    { 
      id: 2, 
      name: 'Budi Santoso', 
      scores: { tp1_1: 65, tp1_2: 60, tp1_3: 55, tp1_4: 60, tp1_5: 50, tp1_6: 55, tp1_7: 60, tp2_1: 65, tp2_2: 60, tp2_3: 55, tp2_4: 60, tp2_5: 50, tp3_1: 65, tp3_2: 60, tp3_3: 55, tp3_4: 60, tp3_5: 65, tp3_6: 60 } 
    },
  ]);

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showTpEditor, setShowTpEditor] = useState(false);

  // =========================================
  // LOGIC & UTILS
  // =========================================

  const getIntervalStatus = (score: string | number): IntervalStatus => {
    if (score === '' || score === null || score === undefined) return { label: '-', color: 'bg-slate-50', text: 'text-slate-400', action: '' };
    const val = typeof score === 'string' ? parseFloat(score) : score;
    
    if (isNaN(val)) return { label: '-', color: 'bg-slate-50', text: 'text-slate-400', action: '' };

    if (val >= 86) return { label: 'Sangat Baik (Pengayaan)', color: 'bg-green-100/80', text: 'text-green-700', action: 'Perlu Pengayaan' };
    if (val >= 66) return { label: 'Sudah Tuntas', color: 'bg-blue-100/80', text: 'text-blue-700', action: 'Tidak Perlu Remedial' };
    if (val >= 41) return { label: 'Belum Tuntas (Remedial Sebagian)', color: 'bg-yellow-100/80', text: 'text-yellow-700', action: 'Remedial Bagian Tertentu' };
    return { label: 'Belum Tuntas (Remedial Total)', color: 'bg-red-100/80', text: 'text-red-700', action: 'Remedial Seluruh Bagian' };
  };

  const calculateAverage = (scores: Record<string, number | string>): string => {
    let total = 0;
    let count = 0;
    tps.forEach(tp => {
      const val = parseFloat(scores[tp.id] as string);
      if (!isNaN(val)) {
        total += val;
        count++;
      }
    });
    return count === 0 ? "0" : (total / count).toFixed(1);
  };

  // =========================================
  // HANDLERS
  // =========================================

  const handleScoreChange = (id: number, tpId: string, value: string) => {
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
      setStudents(prev => prev.map(s => 
        s.id === id ? { ...s, scores: { ...s.scores, [tpId]: value } } : s
      ));
    }
  };

  const handleNameChange = (id: number, value: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, name: value } : s));
  };

  const addStudent = () => {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents(prev => [...prev, { id: newId, name: '', scores: {} }]);
  };

  const removeStudent = (id: number) => {
    if (window.confirm('Hapus baris siswa ini?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleConfigChange = (field: keyof Config, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleTpChange = (index: number, field: keyof TP, value: string) => {
    const newTps = [...tps];
    newTps[index] = { ...newTps[index], [field]: value };
    setTps(newTps);
  };

  const addTp = () => {
    const newCode = tps.length + 1;
    const newId = `tp_new_${Date.now()}`;
    setTps(prev => [...prev, { id: newId, code: `${newCode}.0`, label: 'TP Baru', desc: 'Deskripsi TP baru' }]);
  };

  const removeTp = (index: number) => {
    if (window.confirm('Hapus Tujuan Pembelajaran ini? Data nilai siswa untuk kolom ini akan hilang.')) {
      setTps(prev => prev.filter((_, i) => i !== index));
    }
  };

  const downloadCSV = () => {
    const headers = ['No', 'Nama Siswa', ...tps.map(t => `"${t.code} ${t.label}"`), 'Rata-rata', 'Keterangan', 'Tindak Lanjut'];
    
    const rows = students.map((s, idx) => {
      const avg = calculateAverage(s.scores);
      const status = getIntervalStatus(avg);
      return [
        idx + 1,
        `"${s.name}"`,
        ...tps.map(t => s.scores[t.id] || 0),
        avg,
        `"${status.label}"`,
        `"${status.action || ''}"`
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KKTP_${config.subject.replace(/\s+/g, '_')}_${config.year.replace('/','-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-sm selection:bg-blue-200">
      
      <ConfigModal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
        config={config} 
        onConfigChange={handleConfigChange}
      />

      <TpEditorModal 
        isOpen={showTpEditor} 
        onClose={() => setShowTpEditor(false)} 
        tps={tps} 
        onTpChange={handleTpChange} 
        onAddTp={addTp} 
        onRemoveTp={removeTp} 
      />

      <div className="max-w-[1920px] mx-auto bg-white shadow-2xl overflow-hidden min-h-screen flex flex-col relative">
        
        {/* HEADER AREA */}
        <header className="bg-slate-900 text-white p-6 border-b-4 border-yellow-400 relative overflow-hidden">
           {/* Decorative Background Pattern */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-400 text-slate-900 p-2 rounded-lg shadow-lg">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
                  Aplikasi Penilaian Siswa
                </h1>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-x-8 gap-y-1 text-slate-300 text-sm mt-3">
                 <div className="flex items-center gap-2">
                   <span className="bg-slate-700 px-2 py-0.5 rounded text-xs font-semibold tracking-wider uppercase text-slate-400">Sekolah</span>
                   <span className="font-medium text-white">{config.schoolName}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="bg-slate-700 px-2 py-0.5 rounded text-xs font-semibold tracking-wider uppercase text-slate-400">Mapel</span>
                   <span className="font-medium text-white">{config.subject}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="bg-slate-700 px-2 py-0.5 rounded text-xs font-semibold tracking-wider uppercase text-slate-400">Kelas</span>
                   <span className="font-medium text-white">{config.phase}</span>
                 </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => setIsConfigOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-lg border border-slate-700 transition-all hover:shadow-lg hover:border-slate-500"
              >
                <Settings size={16} /> Pengaturan
              </button>
              <button 
                onClick={downloadCSV}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-yellow-900/20 transition-all hover:scale-105 active:scale-95"
              >
                <Download size={18} /> Export Excel / CSV
              </button>
            </div>
          </div>
        </header>

        {/* STATUS BAR */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sticky top-0 z-20 shadow-sm">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">
              <Info size={14} />
              <span>Legenda Interval Ketercapaian (KKTP)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs w-full max-w-4xl">
              <div className="flex items-center gap-3 bg-red-50 p-2.5 rounded-md border border-red-100">
                <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                <div>
                    <span className="block font-bold text-red-900 text-lg leading-none">0-40</span>
                    <span className="text-red-700/80 font-medium">Belum Mencapai</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-yellow-50 p-2.5 rounded-md border border-yellow-100">
                <div className="w-2 h-8 bg-yellow-500 rounded-full"></div>
                <div>
                    <span className="block font-bold text-yellow-900 text-lg leading-none">41-65</span>
                    <span className="text-yellow-700/80 font-medium">Belum Tuntas</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 p-2.5 rounded-md border border-blue-100">
                <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                <div>
                    <span className="block font-bold text-blue-900 text-lg leading-none">66-85</span>
                    <span className="text-blue-700/80 font-medium">Sudah Tuntas</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-green-50 p-2.5 rounded-md border border-green-100">
                 <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                 <div>
                    <span className="block font-bold text-green-900 text-lg leading-none">86+</span>
                    <span className="text-green-700/80 font-medium">Pengayaan</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <button 
              onClick={() => setShowTpEditor(true)}
              className="flex items-center gap-2 bg-white border border-slate-300 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 text-slate-600 font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <Edit3 size={16} /> <span className="hidden sm:inline">Edit Kolom /</span> Tujuan Pembelajaran
            </button>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="flex-1 overflow-auto relative bg-slate-50/50 pb-24">
          <table className="w-full border-separate border-spacing-0 text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-600 uppercase tracking-wider text-center font-bold text-[11px] h-12">
                <th className="border-b border-r border-slate-300 px-2 w-12 sticky left-0 top-0 bg-slate-100 z-30 shadow-[1px_0_3px_rgba(0,0,0,0.05)]">No</th>
                <th className="border-b border-r border-slate-300 px-4 w-64 text-left sticky left-12 top-0 bg-slate-100 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">Nama Siswa</th>
                
                {tps.map(tp => (
                  <th key={tp.id} className="border-b border-r border-slate-200 px-1 w-20 min-w-[80px] sticky top-0 bg-slate-50 z-20 group cursor-help hover:bg-blue-50 transition-colors">
                    <div className="flex flex-col items-center justify-center h-full py-2">
                      <span className="bg-white border border-slate-300 text-slate-700 px-1.5 py-0.5 rounded shadow-sm mb-1">{tp.code}</span>
                      <span className="text-[10px] leading-tight text-slate-500 hidden md:block max-w-[70px] truncate">{tp.label}</span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-56 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl z-50 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 duration-200">
                      <div className="font-bold text-yellow-400 mb-1 border-b border-slate-600 pb-1">TP {tp.code}: {tp.label}</div>
                      <p className="leading-relaxed text-slate-300">{tp.desc}</p>
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45"></div>
                    </div>
                  </th>
                ))}
                
                <th className="border-b border-r border-slate-200 px-2 w-20 bg-blue-50/50 text-blue-900 sticky top-0 z-20">Rata2</th>
                <th className="border-b border-r border-slate-200 px-4 w-48 bg-blue-50/50 text-blue-900 sticky top-0 z-20">Keterangan</th>
                <th className="border-b border-slate-200 px-2 w-12 sticky top-0 bg-slate-100 z-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {students.map((student, index) => {
                const avg = calculateAverage(student.scores);
                const status = getIntervalStatus(avg);
                return (
                  <tr key={student.id} className="group hover:bg-slate-50 transition-colors">
                    
                    {/* Fixed Columns */}
                    <td className="border-b border-r border-slate-200 p-2 text-center sticky left-0 bg-white group-hover:bg-slate-50 z-10 text-slate-400 font-medium">
                        {index + 1}
                    </td>
                    <td className="border-b border-r border-slate-200 p-0 sticky left-12 bg-white group-hover:bg-slate-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center h-full px-2">
                        <div className="text-slate-300 mr-2 group-focus-within:text-blue-500 transition-colors">
                           <User size={14}/>
                        </div>
                        <input 
                          type="text" 
                          value={student.name}
                          onChange={(e) => handleNameChange(student.id, e.target.value)}
                          placeholder="Nama Siswa..."
                          className="w-full h-10 bg-transparent outline-none font-medium text-slate-700 placeholder-slate-300 text-sm focus:text-blue-700"
                        />
                      </div>
                    </td>

                    {/* Score Columns */}
                    {tps.map(tp => (
                      <td key={tp.id} className="border-b border-r border-slate-100 p-1 text-center relative">
                        <input
                          type="number"
                          value={student.scores[tp.id] || ''}
                          onChange={(e) => handleScoreChange(student.id, tp.id, e.target.value)}
                          className={`w-full text-center outline-none rounded p-1.5 text-sm transition-all focus:ring-2 focus:ring-blue-400 focus:z-10 relative
                            ${(student.scores[tp.id] || 0) < 66 && student.scores[tp.id] !== undefined && student.scores[tp.id] !== '' 
                              ? 'text-red-600 font-bold bg-red-50/50' 
                              : 'text-slate-600 font-medium hover:bg-slate-100 focus:bg-white'
                            }`}
                          placeholder="-"
                        />
                      </td>
                    ))}

                    {/* Summary Columns */}
                    <td className="border-b border-r border-slate-200 p-2 text-center font-bold bg-blue-50/30 text-blue-800">
                      {avg}
                    </td>
                    <td className={`border-b border-r border-slate-200 p-2 text-center text-[10px] font-bold uppercase tracking-wide leading-tight ${status.color} ${status.text}`}>
                      {status.label}
                    </td>
                    <td className="border-b border-slate-200 p-2 text-center">
                      <button 
                        onClick={() => removeStudent(student.id)}
                        className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-all"
                        title="Hapus Siswa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {/* Empty State / Add Button Row inside table for continuity */}
              {students.length === 0 && (
                <tr>
                   <td colSpan={tps.length + 5} className="p-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-3">
                        <User size={48} strokeWidth={1} className="text-slate-200"/>
                        <p>Belum ada data siswa.</p>
                        <button onClick={addStudent} className="text-blue-600 hover:underline font-medium">Tambah siswa pertama</button>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex justify-between items-center transition-transform">
          <div className="flex items-center gap-4">
             <button 
                onClick={addStudent}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-semibold active:scale-95"
              >
                <Plus size={20} /> <span className="hidden sm:inline">Tambah Siswa</span>
              </button>
              <div className="hidden sm:block text-xs text-slate-400">
                Total Siswa: <strong className="text-slate-700">{students.length}</strong>
              </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-xs text-slate-500 mr-8">
            <div className="text-right">
              <p className="mb-1">Mengetahui Kepala Sekolah</p>
              <p className="font-bold text-slate-800">{config.headmasterName}</p>
            </div>
            <div className="text-right">
              <p className="mb-1">Guru Mata Pelajaran</p>
              <p className="font-bold text-slate-800">{config.teacherName}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;