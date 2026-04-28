"use client"

import React from "react"

export function PcbBackground(): React.ReactElement {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <style>{`
        /* ── base flow ── */
        @keyframes flow    { to { stroke-dashoffset: -40; } }
        @keyframes flow-rev{ to { stroke-dashoffset:  40; } }

        /* ── vias ── */
        @keyframes via-pulse { 0%,100%{opacity:.35} 50%{opacity:.9} }

        /* ── LED status ── */
        @keyframes led-glow {
          0%,88%,100%{opacity:.25;filter:drop-shadow(0 0 2px #06b6d4)}
          90%,97%{opacity:1;filter:drop-shadow(0 0 10px #06b6d4) drop-shadow(0 0 22px #06b6d4)}
        }

        /* ── oscilloscope ── */
        @keyframes scope-sweep {
          0%   { d: path("M 5 28 Q 20 12 30 28 Q 40 44 50 28 Q 60 12 70 28 Q 80 44 90 28 Q 100 12 110 28 Q 120 44 125 28"); }
          33%  { d: path("M 5 30 Q 20 10 30 30 Q 40 50 50 25 Q 60  5 70 30 Q 80 50 90 25 Q 100  5 110 30 Q 120 50 125 30"); }
          66%  { d: path("M 5 26 Q 20 46 30 26 Q 40 10 50 30 Q 60 50 70 26 Q 80 10 90 30 Q 100 46 110 26 Q 120 10 125 26"); }
          100% { d: path("M 5 28 Q 20 12 30 28 Q 40 44 50 28 Q 60 12 70 28 Q 80 44 90 28 Q 100 12 110 28 Q 120 44 125 28"); }
        }

        /* ── IC body glow ── */
        @keyframes ic-glow {
          0%,100%{opacity:.10; filter:none}
          50%    {opacity:.55; filter:drop-shadow(0 0 6px rgba(6,182,212,0.6))}
        }

        /* ── data burst (bright fast packet) ── */
        @keyframes burst { to { stroke-dashoffset: -80; } }

        /* ── pin activity flash ── */
        @keyframes pin-flash {
          0%,80%,100%{opacity:0}
          85%,95%{opacity:1}
        }

        /* ── crystal shimmer ── */
        @keyframes crystal-shimmer {
          0%,100%{opacity:.22} 50%{opacity:.55}
        }

        /* ── chip label scan ── */
        @keyframes label-scan {
          0%,100%{opacity:.13} 40%,60%{opacity:.42}
        }

        /* ── regular flows ── */
        .flow-s1  { stroke-dasharray:8 32;  animation:flow     3s    linear infinite; }
        .flow-s2  { stroke-dasharray:8 32;  animation:flow     4.5s  linear infinite  .8s; }
        .flow-s3  { stroke-dasharray:8 32;  animation:flow     2.8s  linear infinite  .3s; }
        .flow-s4  { stroke-dasharray:8 32;  animation:flow     6s    linear infinite 1.2s; }
        .flow-s5  { stroke-dasharray:8 32;  animation:flow     3.6s  linear infinite  .5s; }
        .flow-s6  { stroke-dasharray:8 32;  animation:flow     5s    linear infinite  2s; }
        .flow-s7  { stroke-dasharray:8 32;  animation:flow     3.2s  linear infinite  .6s; }
        .flow-s8  { stroke-dasharray:8 32;  animation:flow     5.5s  linear infinite 1.5s; }
        .flow-s9  { stroke-dasharray:8 32;  animation:flow     4.1s  linear infinite  .9s; }
        .flow-s10 { stroke-dasharray:8 32;  animation:flow     2.6s  linear infinite  .2s; }
        .flow-s11 { stroke-dasharray:8 32;  animation:flow-rev 4.8s  linear infinite  .7s; }
        .flow-s12 { stroke-dasharray:8 32;  animation:flow     3.9s  linear infinite 1.1s; }

        /* ── power buses ── */
        .flow-pwr { stroke-dasharray:12 24; animation:flow     2s    linear infinite; }
        .flow-gnd { stroke-dasharray:12 24; animation:flow-rev 2.4s  linear infinite  .5s; }

        /* ── data burst ── */
        .burst-1  { stroke-dasharray:4 120; animation:burst    1.4s  linear infinite; }
        .burst-2  { stroke-dasharray:4 120; animation:burst    1.9s  linear infinite  .4s; }
        .burst-3  { stroke-dasharray:4 120; animation:burst    1.1s  linear infinite  .8s; }

        /* ── vias ── */
        .via-a    { animation:via-pulse 2s   ease-in-out infinite; }
        .via-b    { animation:via-pulse 3s   ease-in-out infinite  .5s; }
        .via-c    { animation:via-pulse 2.5s ease-in-out infinite  1s; }
        .via-d    { animation:via-pulse 1.8s ease-in-out infinite  .3s; }

        /* ── LED / crystal ── */
        .led      { animation:led-glow      2.2s  ease-in-out infinite; }
        .crystal  { animation:crystal-shimmer 1.6s ease-in-out infinite; }
        .scope    { animation:scope-sweep   1.8s  ease-in-out infinite; }

        /* ── IC highlights ── */
        .ic-u1-glow { animation:ic-glow     3.5s  ease-in-out infinite; }
        .ic-u2-glow { animation:ic-glow     4.2s  ease-in-out infinite  1s; }
        .label-scan { animation:label-scan  4s    ease-in-out infinite; }

        /* ── active pins ── */
        .pin-rx   { animation:pin-flash     2.1s  ease-in-out infinite; }
        .pin-tx   { animation:pin-flash     2.1s  ease-in-out infinite  .4s; }
        .pin-sck  { animation:pin-flash     1.3s  ease-in-out infinite  .1s; }
        .pin-can  { animation:pin-flash     3.2s  ease-in-out infinite  .6s; }
      `}</style>
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* FR4 substrate */}
        <rect width="1600" height="900" fill="#030d07" />

        {/* Board edge cuts */}
        <rect x="2" y="2" width="1596" height="896" fill="none"
          stroke="rgba(220,190,0,0.12)" strokeWidth="2" strokeDasharray="10 5" />

        {/* Mounting holes */}
        {([[50,50],[1550,50],[50,850],[1550,850]] as [number,number][]).map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <circle cx={cx} cy={cy} r="13" fill="#020a04" stroke="rgba(184,115,51,0.2)" strokeWidth="1"/>
            <circle cx={cx} cy={cy} r="5"  fill="#010601"/>
          </g>
        ))}

        {/* ── POWER BUSES ── */}
        <line x1="0" y1="55"  x2="1600" y2="55"  stroke="rgba(184,115,51,0.2)" strokeWidth="5"/>
        <line x1="0" y1="845" x2="1600" y2="845" stroke="rgba(184,115,51,0.2)" strokeWidth="5"/>
        <line x1="350" y1="55"  x2="1250" y2="55"  stroke="rgba(6,182,212,0.28)" strokeWidth="5" className="flow-pwr"/>
        <line x1="200" y1="845" x2="1400" y2="845" stroke="rgba(6,182,212,0.18)" strokeWidth="4" className="flow-gnd"/>

        {/* VCC / GND silkscreen */}
        {[80,380,780,1180,1450].map((x,i) => (
          <text key={i} x={x} y={47} fill="rgba(255,255,255,0.06)" fontSize="9" fontFamily="monospace">VCC</text>
        ))}
        {[80,380,780,1180,1450].map((x,i) => (
          <text key={i} x={x} y={858} fill="rgba(255,255,255,0.06)" fontSize="9" fontFamily="monospace">GND</text>
        ))}

        {/* ── VCC DROPS ── */}
        <g stroke="rgba(184,115,51,0.16)" strokeWidth="3" fill="none">
          <path d="M 470 55  L 470 210 L 430 250 L 430 375"/>
          <path d="M 1150 55 L 1150 220 L 1110 260 L 1110 315"/>
          <path d="M 430 535 L 430 605 L 470 645 L 470 845"/>
          <path d="M 1110 410 L 1110 475 L 1150 515 L 1150 845"/>
        </g>

        {/* ── STATIC SIGNAL TRACES ── */}
        <g stroke="rgba(184,115,51,0.11)" strokeWidth="1.5" fill="none">
          <path d="M 590 420 L 685 420 L 725 460 L 1090 460"/>
          <path d="M 590 435 L 678 435 L 718 475 L 1090 475"/>
          <path d="M 590 450 L 671 450 L 711 490 L 1090 490"/>
          <path d="M 420 468 L 345 468 L 305 508 L 305 660"/>
          <path d="M 420 483 L 338 483 L 298 523 L 298 660"/>
          <path d="M 420 512 L 195 512 L 155 472 L 155 145"/>
          <path d="M 420 527 L 190 527 L 150 487 L 150 145"/>
          <path d="M 545 375 L 545 268 L 585 228 L 1360 228 L 1400 188"/>
          <path d="M 560 375 L 560 283 L 600 243 L 1365 243 L 1405 203"/>
          <path d="M 575 375 L 575 298 L 615 258 L 1370 258 L 1408 218"/>
          <path d="M 590 512 L 805 512 L 845 552 L 845 758"/>
          <path d="M 590 527 L 798 527 L 838 567 L 838 758"/>
          <path d="M 545 535 L 545 615 L 505 655 L 95 655"/>
          <path d="M 420 432 L 215 432 L 175 392 L 175 145"/>
          <path d="M 905 55  L 905 132 L 945 172 L 945 728 L 905 768 L 905 845"/>
          <path d="M 695 845 L 695 768 L 735 728 L 1005 728 L 1045 768 L 1045 845"/>
          <path d="M 1505 348 L 1462 348 L 1422 388 L 1422 702 L 1462 742 L 1502 742"/>
          <path d="M 95 145 L 135 145 L 175 185 L 175 382"/>
          <line x1="430" y1="375" x2="430" y2="348"/>
          <line x1="448" y1="375" x2="448" y2="348"/>
          <line x1="562" y1="375" x2="562" y2="348"/>
          <line x1="580" y1="375" x2="580" y2="348"/>
          <line x1="430" y1="535" x2="430" y2="562"/>
          <line x1="448" y1="535" x2="448" y2="562"/>
          <line x1="328" y1="337" x2="290" y2="337"/>
          <line x1="390" y1="337" x2="430" y2="337"/>
        </g>

        {/* ── ANIMATED CYAN TRACES (existing + new) ── */}
        <g fill="none">
          {/* SPI MOSI */}
          <path d="M 590 420 L 685 420 L 725 460 L 1090 460"
            stroke="rgba(6,182,212,0.45)" strokeWidth="1.5" className="flow-s1"/>
          {/* SPI SCK */}
          <path d="M 590 450 L 671 450 L 711 490 L 1090 490"
            stroke="rgba(6,182,212,0.45)" strokeWidth="1.5" className="flow-s2"/>
          {/* JTAG */}
          <path d="M 545 375 L 545 268 L 585 228 L 1360 228 L 1400 188"
            stroke="rgba(6,182,212,0.38)" strokeWidth="1.5" className="flow-s4"/>
          {/* CAN H */}
          <path d="M 420 512 L 195 512 L 155 472 L 155 145"
            stroke="rgba(6,182,212,0.38)" strokeWidth="1.5" className="flow-s5"/>
          {/* I2C SDA */}
          <path d="M 590 512 L 805 512 L 845 552 L 845 758"
            stroke="rgba(6,182,212,0.38)" strokeWidth="1.5" className="flow-s6"/>
          {/* UART TX */}
          <path d="M 420 468 L 345 468 L 305 508 L 305 660"
            stroke="rgba(6,182,212,0.32)" strokeWidth="1.5" className="flow-s3"/>

          {/* NEW: SPI MISO (reversed) */}
          <path d="M 590 435 L 678 435 L 718 475 L 1090 475"
            stroke="rgba(6,182,212,0.30)" strokeWidth="1.5" className="flow-s7"/>
          {/* NEW: UART RX */}
          <path d="M 420 483 L 338 483 L 298 523 L 298 660"
            stroke="rgba(6,182,212,0.28)" strokeWidth="1.5" className="flow-s8"/>
          {/* NEW: CAN L */}
          <path d="M 420 527 L 190 527 L 150 487 L 150 145"
            stroke="rgba(6,182,212,0.28)" strokeWidth="1.5" className="flow-s9"/>
          {/* NEW: I2C SCL */}
          <path d="M 590 527 L 798 527 L 838 567 L 838 758"
            stroke="rgba(6,182,212,0.28)" strokeWidth="1.5" className="flow-s10"/>
          {/* NEW: ADC */}
          <path d="M 420 432 L 215 432 L 175 392 L 175 145"
            stroke="rgba(6,182,212,0.25)" strokeWidth="1.5" className="flow-s11"/>
          {/* NEW: PWM */}
          <path d="M 545 535 L 545 615 L 505 655 L 95 655"
            stroke="rgba(6,182,212,0.25)" strokeWidth="1.5" className="flow-s12"/>
          {/* NEW: vertical backbone */}
          <path d="M 905 55 L 905 132 L 945 172 L 945 728 L 905 768 L 905 845"
            stroke="rgba(6,182,212,0.18)" strokeWidth="1.5" className="flow-s4"/>
          {/* NEW: JTAG line 2 */}
          <path d="M 560 375 L 560 283 L 600 243 L 1365 243 L 1405 203"
            stroke="rgba(6,182,212,0.22)" strokeWidth="1.5" className="flow-s8"/>
        </g>

        {/* ── DATA BURST LAYER (bright fast packets on top) ── */}
        <g fill="none">
          <path d="M 590 420 L 685 420 L 725 460 L 1090 460"
            stroke="rgba(6,182,212,0.9)" strokeWidth="2.5" className="burst-1"/>
          <path d="M 420 512 L 195 512 L 155 472 L 155 145"
            stroke="rgba(6,182,212,0.9)" strokeWidth="2.5" className="burst-2"/>
          <path d="M 545 375 L 545 268 L 585 228 L 1360 228 L 1400 188"
            stroke="rgba(6,182,212,0.85)" strokeWidth="2.5" className="burst-3"/>
        </g>

        {/* ── VIAS ── */}
        {([[470,250],[430,375],[470,645],[430,535],[1110,260],[1110,315],[1110,410],[1150,515]] as [number,number][]).map(([cx,cy],i) => (
          <g key={i} className={["via-a","via-b","via-c","via-d"][i%4]}>
            <circle cx={cx} cy={cy} r="6.5" fill="rgba(184,115,51,0.42)" stroke="rgba(200,140,60,0.55)" strokeWidth="1.5"/>
            <circle cx={cx} cy={cy} r="2.8" fill="#020804"/>
          </g>
        ))}
        {([[545,268],[560,283],[575,298],[845,552],[838,567],[305,508],[298,523],[155,472],[150,487],[945,172],[945,728]] as [number,number][]).map(([cx,cy],i) => (
          <g key={i} className={i%2===0?"via-b":"via-c"}>
            <circle cx={cx} cy={cy} r="4.2" fill="rgba(184,115,51,0.32)" stroke="rgba(200,140,60,0.45)" strokeWidth="1"/>
            <circle cx={cx} cy={cy} r="1.8" fill="#020804"/>
          </g>
        ))}

        {/* ── MAIN MCU — STM32 QFP-64 ── */}
        <g transform="translate(420,370)">
          {/* Glow border */}
          <rect x="-4" y="-4" width="173" height="173"
            fill="none" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" className="ic-u1-glow"/>
          <rect width="165" height="165" fill="rgba(18,22,18,0.92)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <rect x="22" y="22" width="121" height="121" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
          {/* Labels */}
          <text x="82" y="68"  fill="rgba(6,182,212,0.0)" fontSize="9"  fontFamily="monospace" textAnchor="middle" className="label-scan"
            style={{fill:"rgba(6,182,212,0.45)"}}>STM32F446</text>
          <text x="82" y="82"  fill="rgba(255,255,255,0.07)" fontSize="7"  fontFamily="monospace" textAnchor="middle">LQFP-64</text>
          <text x="82" y="96" fill="rgba(6,182,212,0.18)"  fontSize="7"  fontFamily="monospace" textAnchor="middle">180MHz · 2MB Flash</text>
          {/* Mini activity grid inside chip */}
          {[[40,115],[52,115],[64,115],[76,115],[88,115],[100,115],[112,115]].map(([x,y],i)=>(
            <rect key={i} x={x} y={y} width="8" height="4" rx="0.5"
              fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="0.3"
              style={{animation:`pin-flash ${1.2+i*0.3}s ease-in-out infinite ${i*0.15}s`}}/>
          ))}
          {/* Top pins */}
          {Array.from({length:16},(_,i)=>(
            <rect key={i} x={8+i*9.8} y={-9} width={6} height={9}
              fill={i===3||i===4?"rgba(6,182,212,0.7)":"rgba(184,115,51,0.42)"} rx="0.5"
              className={i===3?"pin-tx":i===4?"pin-rx":undefined}/>
          ))}
          {/* Bottom pins */}
          {Array.from({length:16},(_,i)=>(
            <rect key={i} x={8+i*9.8} y={165} width={6} height={9}
              fill={i===7||i===8?"rgba(6,182,212,0.7)":"rgba(184,115,51,0.42)"} rx="0.5"
              className={i===7?"pin-sck":i===8?"pin-can":undefined}/>
          ))}
          {/* Left pins */}
          {Array.from({length:16},(_,i)=>(
            <rect key={i} x={-9} y={8+i*9.8} width={9} height={6} fill="rgba(184,115,51,0.42)" rx="0.5"/>
          ))}
          {/* Right pins */}
          {Array.from({length:16},(_,i)=>(
            <rect key={i} x={165} y={8+i*9.8} width={9} height={6} fill="rgba(184,115,51,0.42)" rx="0.5"/>
          ))}
          {/* Thermal vias */}
          {[[62,132],[74,132],[86,132],[62,144],[74,144],[86,144]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(184,115,51,0.25)" stroke="rgba(184,115,51,0.4)" strokeWidth="0.5"/>
          ))}
          <text x="82" y="-15" fill="rgba(255,255,255,0.12)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">U1</text>
          <circle cx="8" cy="0" r="3.5" fill="rgba(255,255,255,0.18)"/>
          {/* UART pin labels */}
          <text x={8+3*9.8+3} y={-14} fill="rgba(6,182,212,0.35)" fontSize="5" fontFamily="monospace" textAnchor="middle">TX</text>
          <text x={8+4*9.8+3} y={-14} fill="rgba(6,182,212,0.35)" fontSize="5" fontFamily="monospace" textAnchor="middle">RX</text>
        </g>

        {/* ── ESP32-C3 WROOM MODULE ── */}
        <g transform="translate(1090,312)">
          {/* Glow border */}
          <rect x="-4" y="-4" width="133" height="108"
            fill="none" stroke="rgba(6,182,212,0.55)" strokeWidth="1.5" className="ic-u2-glow"/>
          <rect width="125" height="100" fill="rgba(12,22,12,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          {/* Antenna cutout */}
          <rect x="100" y="8" width="22" height="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
          {/* Antenna trace animated */}
          <path d="M 110 12 L 116 12 L 116 44 L 110 44" fill="none"
            stroke="rgba(6,182,212,0.4)" strokeWidth="1" className="ic-u2-glow"/>
          <text x="58" y="42" fill="rgba(6,182,212,0.4)" fontSize="9" fontFamily="monospace" textAnchor="middle" className="label-scan"
            style={{fill:"rgba(6,182,212,0.4)"}}>ESP32-C3</text>
          <text x="58" y="55" fill="rgba(255,255,255,0.07)" fontSize="7" fontFamily="monospace" textAnchor="middle">WROOM-02 · Wi-Fi+BT</text>
          {/* Activity dots */}
          {[0,1,2].map(i=>(
            <circle key={i} cx={22+i*18} cy={72} r="3" fill="rgba(6,182,212,0.15)"
              stroke="rgba(6,182,212,0.5)" strokeWidth="0.5"
              style={{animation:`pin-flash ${1.5+i*0.5}s ease-in-out infinite ${i*0.3}s`}}/>
          ))}
          {Array.from({length:9},(_,i)=>(
            <rect key={i} x={-8} y={8+i*9} width={8} height={5}
              fill={i===2?"rgba(6,182,212,0.65)":"rgba(184,115,51,0.42)"} rx="0.5"
              className={i===2?"pin-rx":undefined}/>
          ))}
          {Array.from({length:9},(_,i)=>(
            <rect key={i} x={125} y={8+i*9} width={8} height={5}
              fill={i===2?"rgba(6,182,212,0.65)":"rgba(184,115,51,0.42)"} rx="0.5"
              className={i===2?"pin-tx":undefined}/>
          ))}
          <text x="58" y="-11" fill="rgba(255,255,255,0.12)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">U2</text>
        </g>

        {/* ── CRYSTAL Y1 ── */}
        <g transform="translate(282,328)">
          <rect x="-9" y="3" width="9" height="9"  fill="rgba(184,115,51,0.35)"/>
          <rect x="55" y="3" width="9" height="9"  fill="rgba(184,115,51,0.35)"/>
          <rect width="55" height="15" rx="7"
            fill="rgba(180,165,80,0.22)" stroke="rgba(180,165,80,0.55)" strokeWidth="1" className="crystal"/>
          {/* Crystal lines */}
          <line x1="15" y1="7.5" x2="40" y2="7.5" stroke="rgba(180,165,80,0.4)" strokeWidth="0.5" className="crystal"/>
          <text x="27" y="-7" fill="rgba(255,255,255,0.08)" fontSize="8" fontFamily="monospace" textAnchor="middle">Y1  8MHz</text>
        </g>

        {/* ── JTAG HEADER J1 ── */}
        <g transform="translate(1358,132)">
          <text x="28" y="-9" fill="rgba(255,255,255,0.08)" fontSize="8" fontFamily="monospace" textAnchor="middle">J1  JTAG/SWD</text>
          {Array.from({length:5},(_,col)=>Array.from({length:2},(_,row)=>(
            <rect key={`${col}-${row}`} x={col*13} y={row*13} width={9} height={9} rx={row===0&&col===0?0:1.5}
              fill={col===0&&row===0?"rgba(6,182,212,0.5)":"rgba(184,115,51,0.38)"}
              stroke="rgba(184,115,51,0.22)" strokeWidth="0.5"
              className={col===0&&row===0?"pin-sck":undefined}/>
          )))}
        </g>

        {/* ── LED D1 ── */}
        <g transform="translate(788,180)">
          <rect x="-18" y="-5" width="11" height="10" fill="rgba(184,115,51,0.35)"/>
          <rect x="23"  y="-5" width="11" height="10" fill="rgba(184,115,51,0.35)"/>
          <rect x="-5" y="-8" width="26" height="16" rx="4"
            fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.5)" strokeWidth="1" className="led"/>
          <circle cx="8" cy="0" r="5" fill="rgba(6,182,212,0.25)" className="led"/>
          <text x="8" y="-16" fill="rgba(255,255,255,0.07)" fontSize="8" fontFamily="monospace" textAnchor="middle">D1  STATUS</text>
        </g>

        {/* ── RESISTORS ── */}
        {([
          {x:728,y:176,label:"R1",rot:false},
          {x:248,y:655,label:"R2",rot:false},
          {x:1258,y:505,label:"R3",rot:true},
          {x:400, y:758,label:"R4",rot:false},
        ] as {x:number;y:number;label:string;rot:boolean}[]).map(({x,y,label,rot})=>(
          <g key={label} transform={`translate(${x},${y})${rot?" rotate(90)":""}`}>
            <rect x={-14} y={-4} width={9} height={8} fill="rgba(184,115,51,0.3)"/>
            <rect x={17}  y={-4} width={9} height={8} fill="rgba(184,115,51,0.3)"/>
            <rect x={-4}  y={-6} width={18} height={12} fill="rgba(40,20,5,0.95)" stroke="rgba(184,115,51,0.28)" strokeWidth="0.5"/>
            <text x="5" y={-12} fill="rgba(255,255,255,0.07)" fontSize="7" fontFamily="monospace" textAnchor="middle">{label}</text>
          </g>
        ))}

        {/* ── DECOUPLING CAPS ── */}
        {([[428,344,"C1"],[450,344,"C2"],[562,344,"C3"],[582,344,"C4"],[1093,303,"C5"],[1112,303,"C6"],[1182,303,"C7"],[1200,303,"C8"]
        ] as [number,number,string][]).map(([x,y,label])=>(
          <g key={label} transform={`translate(${x},${y})`}>
            <rect x={-4} y={-12} width={8} height={8}  fill="rgba(184,115,51,0.3)"/>
            <rect x={-4} y={9}   width={8} height={8}  fill="rgba(184,115,51,0.3)"/>
            <rect x={-5} y={-3}  width={10} height={12} fill="rgba(38,55,38,0.92)" stroke="rgba(184,115,51,0.22)" strokeWidth="0.5"/>
            {label==="C1"&&<text x="2" y={-18} fill="rgba(255,255,255,0.06)" fontSize="7" fontFamily="monospace">{label}</text>}
          </g>
        ))}

        {/* ── OSCILLOSCOPE SCREEN ── */}
        <g transform="translate(1280,590)">
          <rect width="130" height="55" rx="3" fill="rgba(0,20,5,0.85)" stroke="rgba(6,182,212,0.2)" strokeWidth="1"/>
          {[13,26,39,52].map(y=><line key={y} x1="0" y1={y} x2="130" y2={y} stroke="rgba(6,182,212,0.06)" strokeWidth="0.5"/>)}
          {[26,52,78,104].map(x=><line key={x} x1={x} y1="0" x2={x} y2="55" stroke="rgba(6,182,212,0.06)" strokeWidth="0.5"/>)}
          <path d="M 5 28 Q 20 12 30 28 Q 40 44 50 28 Q 60 12 70 28 Q 80 44 90 28 Q 100 12 110 28 Q 120 44 125 28"
            stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="none" className="scope"/>
          <text x="2" y="-6" fill="rgba(255,255,255,0.07)" fontSize="7" fontFamily="monospace">CH1  500mV  1ms</text>
        </g>

        {/* ── SILKSCREEN ── */}
        <text x="75"  y="198" fill="rgba(255,255,255,0.045)" fontSize="8"  fontFamily="monospace">KJ-DEV-BOARD v2.1</text>
        <text x="75"  y="212" fill="rgba(255,255,255,0.03)"  fontSize="7"  fontFamily="monospace">© 2024 Kiran Jojare</text>
        <text x="1250" y="800" fill="rgba(255,255,255,0.03)" fontSize="8"  fontFamily="monospace">MADE WITH LOVE + SOLDER</text>
        <text x="75"  y="780" fill="rgba(255,255,255,0.03)"  fontSize="7"  fontFamily="monospace">ROHS COMPLIANT  FR4  1.6mm  2-LAYER</text>
        <text x="1300" y="85" fill="rgba(255,255,255,0.04)"  fontSize="8"  fontFamily="monospace">3V3  ──  5V  ──  GND</text>
      </svg>
    </div>
  )
}
