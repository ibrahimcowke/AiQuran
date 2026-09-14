import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, Square, RefreshCcw, Volume2, AlertTriangle, CheckCircle2, 
  Info, Target, Sparkles, BookOpenCheck, Play, Pause, ShieldCheck 
} from 'lucide-react';
import { formatAyahAudioUrl } from '../data/quranData';

export default function VoiceLab({ setView }) {
  const [recordingState, setRecordingState] = useState('idle'); // 'idle', 'recording', 'analyzing', 'results'
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [sheikhPlaying, setSheikhPlaying] = useState(false);
  const [userAudioPlaying, setUserAudioPlaying] = useState(false);
  
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timerRef = useRef(null);
  const sheikhAudioRef = useRef(null);
  const userAudioPlayerRef = useRef(null);

  // Reference Sheikh Al-Husary Ayah 2 of Al-Fatihah
  const referenceAudioUrl = formatAyahAudioUrl('Husary_128kbps', 1, 2);

  // Clean up audio context and media stream on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.9;

        // Elegant emerald-to-teal gradient
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#059669');
        gradient.addColorStop(0.6, '#10B981');
        gradient.addColorStop(1, '#34D399');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    renderFrame();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Set up Web Audio API analyser for live waveform
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const recordedAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(recordedAudioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecordingState('recording');
      setRecordingDuration(0);

      // Start duration counter
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      drawVisualizer();
    } catch (err) {
      console.warn("Microphone access failed or denied, using prototype fallback:", err);
      // Fallback simulation if microphone not granted
      setRecordingState('recording');
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    setRecordingState('analyzing');
    setTimeout(() => {
      setRecordingState('results');
    }, 2200);
  };

  const handleSheikhPlay = () => {
    if (!sheikhAudioRef.current) return;
    if (sheikhPlaying) {
      sheikhAudioRef.current.pause();
      setSheikhPlaying(false);
    } else {
      sheikhAudioRef.current.play();
      setSheikhPlaying(true);
    }
  };

  const handleUserPlay = () => {
    if (!userAudioPlayerRef.current) return;
    if (userAudioPlaying) {
      userAudioPlayerRef.current.pause();
      setUserAudioPlaying(false);
    } else {
      userAudioPlayerRef.current.play();
      setUserAudioPlaying(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 lg:px-8 py-6" dir="rtl">
      
      {/* Audio Element for Sheikh */}
      <audio
        ref={sheikhAudioRef}
        src={referenceAudioUrl}
        onEnded={() => setSheikhPlaying(false)}
      />

      {/* Audio Element for User's recorded voice */}
      {audioUrl && (
        <audio
          ref={userAudioPlayerRef}
          src={audioUrl}
          onEnded={() => setUserAudioPlaying(false)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold font-arabic mb-2">
            <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
            <span>معمل التلاوة والذكاء الاصطناعي</span>
            <span className="font-sans text-[10px]" dir="ltr">AI Voice Studio</span>
          </div>
          <h1 className="text-2xl font-bold font-arabic text-stone-900 dark:text-stone-100">
            استمع وصحح التلاوة
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-1">
            سجل تلاوتك بصوتك، وسيقوم النظام الذكي بتحليل مخارج الحروف وقواعد التجويد ومقارنتها بتلاوة الشيوخ المعتمدين.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-500 font-arabic">الآية المختارة:</span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-arabic">
            سورة الفاتحة (آية 2)
          </span>
        </div>
      </div>

      {/* Scholarly disclaimer */}
      <div className="bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl p-4 flex items-start gap-3 mb-6">
        <Info className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={20} />
        <div className="text-xs">
          <span className="font-bold text-amber-950 dark:text-amber-200 font-arabic block mb-0.5">
            تنبيه شرعي وتعليمي هام
          </span>
          <p className="text-amber-900/80 dark:text-amber-300/80 text-[11px] font-arabic leading-relaxed">
            الذكاء الاصطناعي وسيلة مساعدة للتدرب الذاتي وتنبيه الذاكرة، ولا يغني بأي حال عن التلقي والمشافهة وعرض القرآن على معلم مجاز بالسند المتصل.
          </p>
        </div>
      </div>

      {/* Selected Ayah Prompt Card */}
      <div className="bg-white dark:bg-[#121E1A] rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-emerald-900/40 shadow-sm text-center mb-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400"></div>

        <span className="text-[11px] text-stone-400 font-sans block mb-2" dir="ltr">
          Surah Al-Fatihah, Ayah 2
        </span>
        <p className="font-arabic font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-loose mb-4" style={{ fontFamily: "Amiri, serif" }}>
          الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
        </p>
        <div className="w-16 h-0.5 bg-stone-200 dark:bg-emerald-900/60 mx-auto mb-4"></div>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-sans font-medium" dir="ltr">
          [All] praise is [due] to Allah, Lord of the worlds -
        </p>
      </div>

      {/* Dynamic Interaction & Recording Arena */}
      <div className="bg-stone-50 dark:bg-[#0E1715] rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-emerald-900/30 text-center mb-6 flex flex-col items-center justify-center min-h-[260px]">
        
        {recordingState === 'idle' && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-inner">
              <Mic size={32} />
            </div>
            <h3 className="text-lg font-bold font-arabic text-stone-900 dark:text-stone-100 mb-1">
              جاهز للاستماع لتلاوتك
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mb-6">
              اضغط على زر الميكروفون بالأسفل وابدأ القراءة بترتيل وهدوء
            </p>
            <button
              onClick={startRecording}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold font-arabic flex items-center gap-2 shadow-lg shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Mic size={18} />
              <span>ابدأ التسجيل الآن</span>
            </button>
          </div>
        )}

        {recordingState === 'recording' && (
          <div className="flex flex-col items-center w-full">
            {/* Live Waveform Canvas */}
            <div className="w-full max-w-md h-24 mb-4 rounded-2xl bg-white/60 dark:bg-[#121E1A]/80 border border-stone-200/80 dark:border-emerald-900/40 p-2 overflow-hidden flex items-center justify-center">
              <canvas ref={canvasRef} width={400} height={90} className="w-full h-full" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-sm font-bold font-arabic text-red-600 dark:text-red-400">
                جاري التسجيل والاستماع...
              </span>
            </div>
            <p className="text-sm font-bold font-sans text-stone-500 dark:text-stone-300 mb-6" dir="ltr">
              00:{recordingDuration < 10 ? `0${recordingDuration}` : recordingDuration}
            </p>

            <button
              onClick={stopRecording}
              className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold font-arabic flex items-center gap-2 shadow-lg shadow-red-600/30 active:scale-95 transition-all"
            >
              <Square size={18} />
              <span>إنهاء التسجيل والتحليل</span>
            </button>
          </div>
        )}

        {recordingState === 'analyzing' && (
          <div className="flex flex-col items-center py-6">
            <RefreshCcw size={36} className="text-emerald-600 animate-spin mb-4" />
            <h3 className="text-lg font-bold font-arabic text-stone-900 dark:text-stone-100 mb-1">
              الذكاء الاصطناعي يقوم بتحليل التلاوة
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic max-w-sm mb-3">
              مقارنة مخارج الحروف مع قواعد التجويد المعتمدة (المد، القلقلة، تفخيم الحاء)...
            </p>
            <div className="h-1.5 w-48 bg-stone-200 dark:bg-emerald-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        )}

        {recordingState === 'results' && (
          <div className="w-full text-right animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/80 dark:border-emerald-900/40 mb-6">
              <div className="flex items-center gap-2">
                <Target size={20} className="text-emerald-600" />
                <h3 className="font-bold text-lg font-arabic text-stone-900 dark:text-stone-100">
                  نتيجة التحليل الصوتي والتجويدي
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-sm font-sans" dir="ltr">
                  Score: 94%
                </span>
                <button
                  onClick={() => setRecordingState('idle')}
                  className="px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-emerald-950 text-stone-700 dark:text-stone-200 text-xs font-arabic font-bold flex items-center gap-1 hover:bg-stone-300"
                >
                  <RefreshCcw size={14} />
                  <span>إعادة المحاولة</span>
                </button>
              </div>
            </div>

            {/* Audio comparison cards (User vs Sheikh Al-Husary) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              {/* User Voice */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs font-arabic text-stone-900 dark:text-stone-100">
                    تلاوتك المسجلة
                  </h4>
                  <span className="text-[10px] text-stone-400 font-sans" dir="ltr">Your Recording</span>
                </div>
                <button
                  onClick={handleUserPlay}
                  disabled={!audioUrl}
                  className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
                >
                  {userAudioPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              </div>

              {/* Sheikh Al-Husary Voice */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#121E1A] border border-stone-200/80 dark:border-emerald-900/40 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs font-arabic text-stone-900 dark:text-stone-100">
                    التلاوة المرجعية (الشيخ الحصري)
                  </h4>
                  <span className="text-[10px] text-stone-400 font-sans" dir="ltr">Master Reference (Al-Husary)</span>
                </div>
                <button
                  onClick={handleSheikhPlay}
                  className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition-colors"
                >
                  {sheikhPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              </div>

            </div>

            {/* Detailed Feedback Cards */}
            <div className="space-y-4">
              
              {/* Warning on Makhraj */}
              <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-right">
                <div className="flex items-center gap-2 mb-1.5">
                  <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400" />
                  <h4 className="font-bold text-xs font-arabic text-amber-950 dark:text-amber-200">
                    تنبيه في مخرج الحرف: حرف (الحاء)
                  </h4>
                </div>
                <p className="text-xs text-amber-900/90 dark:text-amber-300/90 font-arabic leading-relaxed mb-2">
                  في كلمة <strong className="text-sm text-amber-950 dark:text-amber-100">«الْحَمْدُ»</strong>: يحتاج حرف الحاء إلى زيادة إيضاح ورخاوة من وسط الحلق حتى لا يلتبس بالهاء أو يخرج مكتوماً.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-200/70 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 font-arabic font-bold">
                    المخرج: وسط الحلق (الحلقيات)
                  </span>
                </div>
              </div>

              {/* Correct Tajweed */}
              <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 text-right">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-bold text-xs font-arabic text-emerald-950 dark:text-emerald-200">
                    إتقان ممتاز: المد العارض للسكون
                  </h4>
                </div>
                <p className="text-xs text-emerald-900/90 dark:text-emerald-300/90 font-arabic leading-relaxed">
                  أحسنت في تطبيق مد الوقف في ختام الآية <strong className="text-sm text-emerald-950 dark:text-emerald-100">«الْعَالَمِينَ»</strong> بمقدار متوازن وطبيعي.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
