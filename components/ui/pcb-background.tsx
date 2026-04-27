"use client"

import React from "react"

export function PcbBackground(): React.ReactElement {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes flow    { to { stroke-dashoffset: -40; } }
        @keyframes via-pulse { 0%,100%{opacity:.35} 50%{opacity:.85} }
        @keyframes led-glow {
          0%,88%,100%{opacity:.25;filter:drop-shadow(0 0 2px #06b6d4)}
          90%,97%{opacity:1;filter:drop-shadow(0 0 10px #06b6d4) drop-shadow(0 0 20px #06b6d4)}
        }
        @keyframes scope-sweep {
          0%   { d: path("M 1290 610 Q 1310 590 1320 610 Q 1330 630 1340 610 Q 1350 590 1360 610 Q 1370 630 1380 610 Q 1390 590 1400 610"); }
          33%  { d: path("M 1290 615 Q 1310 595 1320 615 Q 1330 635 1340 600 Q 1350 580 1360 615 Q 1370 635 1380 600 Q 1390 580 1400 615"); }
          66%  { d: path("M 1290 605 Q 1310 625 1320 605 Q 1330 585 1340 620 Q 1350 640 1360 605 Q 1370 585 1380 620 Q 1390 640 1400 605"); }
          100% { d: path("M 1290 610 Q 1310 590 1320 610 Q 1330 630 1340 610 Q 1350 590 1360 610 Q 1370 630 1380 610 Q 1390 590 1400 610"); }
        }
        .flow-s1 { stroke-dasharray:8 32; animation:flow 3s   linear infinite; }
        .flow-s2 { stroke-dasharray:8 32; animation:flow 4.5s linear infinite .8s; }
        .flow-s3 { stroke-dasharray:8 32; animation:flow 2.8s linear infinite .3s; }
        .flow-s4 { stroke-dasharray:8 32; animation:flow 6s   linear infinite 1.2s; }
        .flow-s5 { stroke-dasharray:8 32; animation:flow 3.6s linear infinite .5s; }
        .flow-s6 { stroke-dasharray:8 32; animation:flow 5s   linear infinite 2s; }
        .flow-pwr{ stroke-dasharray:12 24; animation:flow 2s  linear infinite; }
        .via-a   { animation:via-pulse 2s   ease-in-out infinite; }
        .via-b   { animation:via-pulse 3s   ease-in-out infinite .5s; }
        .via-c   { animation:via-pulse 2.5s ease-in-out infinite 1s; }
        .led     { animation:led-glow 2.2s  ease-in-out infinite; }
        .scope   { animation:scope-sweep 1.8s ease-in-out infinite; }
      `}</style>
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* FR4 substrate */}
        <rect width="1600" height="900" fill="#030d07" />

        {/* Board edge cuts (yellow = fab layer) */}
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

        {/* ── POWER BUSES ─────────────────────────────────────────── */}
        <line x1="0" y1="55"  x2="1600" y2="55"  stroke="rgba(184,115,51,0.2)" strokeWidth="5"/>
        <line x1="0" y1="845" x2="1600" y2="845" stroke="rgba(184,115,51,0.2)" strokeWidth="5"/>
        {/* Animated VCC segment */}
        <line x1="350" y1="55" x2="1250" y2="55"
          stroke="rgba(6,182,212,0.28)" strokeWidth="5" className="flow-pwr"/>

        {/* VCC / GND silkscreen */}
        {[80,380,780,1180,1450].map((x,i) => (
          <text key={i} x={x} y={47} fill="rgba(255,255,255,0.06)" fontSize="9" fontFamily="monospace">VCC</text>
        ))}
        {[80,380,780,1180,1450].map((x,i) => (
          <text key={i} x={x} y={858} fill="rgba(255,255,255,0.06)" fontSize="9" fontFamily="monospace">GND</text>
        ))}

        {/* ── VCC DROPS (copper) ─────────────────────────────────── */}
        <g stroke="rgba(184,115,51,0.16)" strokeWidth="3" fill="none">
          <path d="M 470 55  L 470 210 L 430 250 L 430 375"/>
          <path d="M 1150 55 L 1150 220 L 1110 260 L 1110 315"/>
          <path d="M 430 535 L 430 605 L 470 645 L 470 845"/>
          <path d="M 1110 410 L 1110 475 L 1150 515 L 1150 845"/>
        </g>

        {/* ── STATIC SIGNAL TRACES (copper colour) ───────────────── */}
        <g stroke="rgba(184,115,51,0.11)" strokeWidth="1.5" fill="none">
          {/* SPI (MCU → ESP32) */}
          <path d="M 590 420 L 685 420 L 725 460 L 1090 460"/>
          <path d="M 590 435 L 678 435 L 718 475 L 1090 475"/>
          <path d="M 590 450 L 671 450 L 711 490 L 1090 490"/>
          {/* UART debug */}
          <path d="M 420 468 L 345 468 L 305 508 L 305 660"/>
          <path d="M 420 483 L 338 483 L 298 523 L 298 660"/>
          {/* CAN bus */}
          <path d="M 420 512 L 195 512 L 155 472 L 155 145"/>
          <path d="M 420 527 L 190 527 L 150 487 L 150 145"/>
          {/* JTAG */}
          <path d="M 545 375 L 545 268 L 585 228 L 1360 228 L 1400 188"/>
          <path d="M 560 375 L 560 283 L 600 243 L 1365 243 L 1405 203"/>
          <path d="M 575 375 L 575 298 L 615 258 L 1370 258 L 1408 218"/>
          {/* I2C */}
          <path d="M 590 512 L 805 512 L 845 552 L 845 758"/>
          <path d="M 590 527 L 798 527 L 838 567 L 838 758"/>
          {/* PWM */}
          <path d="M 545 535 L 545 615 L 505 655 L 95 655"/>
          {/* ADC */}
          <path d="M 420 432 L 215 432 L 175 392 L 175 145"/>
          {/* Background fillers */}
          <path d="M 905 55  L 905 132 L 945 172 L 945 728 L 905 768 L 905 845"/>
          <path d="M 695 845 L 695 768 L 735 728 L 1005 728 L 1045 768 L 1045 845"/>
          <path d="M 1505 348 L 1462 348 L 1422 388 L 1422 702 L 1462 742 L 1502 742"/>
          <path d="M 95 145 L 135 145 L 175 185 L 175 382"/>
          {/* Decoupling shorts */}
          <line x1="430" y1="375" x2="430" y2="348"/>
          <line x1="448" y1="375" x2="448" y2="348"/>
          <line x1="562" y1="375" x2="562" y2="348"/>
          <line x1="580" y1="375" x2="580" y2="348"/>
          <line x1="430" y1="535" x2="430" y2="562"/>
          <line x1="448" y1="535" x2="448" y2="562"/>
          {/* Crystal traces */}
          <line x1="328" y1="337" x2="290" y2="337"/>
          <line x1="390" y1="337" x2="430" y2="337"/>
        </g>

        {/* ── ANIMATED CYAN TRACES ───────────────────────────────── */}
        <g fill="none">
          <path d="M 590 420 L 685 420 L 725 460 L 1090 460"
            stroke="rgba(6,182,212,0.45)" strokeWidth="1.5" className="flow-s1"/>
          <path d="M 590 450 L 671 450 L 711 490 L 1090 490"
            stroke="rgba(6,182,212,0.45)" strokeWidth="1.5" className="flow-s2"/>
          <path d="M 545 375 L 545 268 L 585 228 L 1360 228 L 1400 188"
            stroke="rgba(6,182,212,0.38)" strokeWidth="1.5" className="flow-s4"/>
          <path d="M 420 512 L 195 512 L 155 472 L 155 145"
            stroke="rgba(6,182,212,0.38)" strokeWidth="1.5" className="flow-s5"/>
          <path d="M 590 512 L 805 512 L 845 552 L 845 758"
            stroke="rgba(6,182,212,0.38)" strokeWidth="1.5" className="flow-s6"/>
          <path d="M 420 468 L 345 468 L 305 508 L 305 660"
            stroke="rgba(6,182,212,0.32)" strokeWidth="1.5" className="flow-s3"/>
        </g>

        {/* ── VIAS ───────────────────────────────────────────────── */}
        {/* Power vias */}
        {([[470,250],[430,375],[470,645],[430,535],[1110,260],[1110,315],[1110,410],[1150,515]] as [number,number][]).map(([cx,cy],i) => (
          <g key={i} className={["via-a","via-b","via-c"][i%3]}>
            <circle cx={cx} cy={cy} r="6.5" fill="rgba(184,115,51,0.42)" stroke="rgba(200,140,60,0.55)" strokeWidth="1.5"/>
            <circle cx={cx} cy={cy} r="2.8" fill="#020804"/>
          </g>
        ))}
        {/* Signal vias */}
        {([[545,268],[560,283],[575,298],[845,552],[838,567],[305,508],[298,523],[155,472],[150,487],[945,172],[945,728]] as [number,number][]).map(([cx,cy],i) => (
          <g key={i} className={i%2===0?"via-b":"via-c"}>
            <circle cx={cx} cy={cy} r="4.2" fill="rgba(184,115,51,0.32)" stroke="rgba(200,140,60,0.45)" strokeWidth="1"/>
            <circle cx={cx} cy={cy} r="1.8" fill="#020804"/>
          </g>
        ))}

        {/* ── MAIN MCU — STM32 QFP-64 ────────────────────────────── */}
        <g transform="translate(420,370)">
          <rect width="165" height="165" fill="rgba(18,22,18,0.92)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <rect x="22" y="22" width="121" height="121" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
          <text x="82" y="74"  fill="rgba(255,255,255,0.13)" fontSize="9"  fontFamily="monospace" textAnchor="middle">STM32F446</text>
          <text x="82" y="87"  fill="rgba(255,255,255,0.07)" fontSize="7"  fontFamily="monospace" textAnchor="middle">LQFP-64</text>
          <text x="82" y="100" fill="rgba(6,182,212,0.12)"  fontSize="7"  fontFamily="monospace" textAnchor="middle">180MHz</text>
          {/* Top pins */}
          {Array.from({length:16},(_,i)=>(
            <rect key={i} x={8+i*9.8} y={-9} width={6} height={9} fill="rgba(184,115,51,0.42)" rx="0.5"/>
          ))}
          {/* Bottom pins */}
          {Array.from({length:16},(_,i)=>(
            <rect key={i} x={8+i*9.8} y={165} width={6} height={9} fill="rgba(184,115,51,0.42)" rx="0.5"/>
          ))}
          {/* Left pins */}
          {Array.from({length:16},(_,i)=>(
            <rect key={i} x={-9} y={8+i*9.8} width={9} height={6} fill="rgba(184,115,51,0.42)" rx="0.5"/>
          ))}
          {/* Right pins */}
          {Array.from({length:16},(_,i)=>(
            <rect key={i} x={165} y={8+i*9.8} width={9} height={6} fill="rgba(184,115,51,0.42)" rx="0.5"/>
          ))}
          {/* Thermal vias cluster */}
          {[[62,120],[74,120],[86,120],[62,132],[74,132],[86,132]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(184,115,51,0.25)" stroke="rgba(184,115,51,0.4)" strokeWidth="0.5"/>
          ))}
          <text x="82" y="-15" fill="rgba(255,255,255,0.1)" fontSize="10" fontFamily="monospace" textAnchor="middle">U1</text>
          <circle cx="8" cy="0" r="3.5" fill="rgba(255,255,255,0.18)"/>
        </g>

        {/* ── ESP32-C3 WROOM MODULE ──────────────────────────────── */}
        <g transform="translate(1090,312)">
          <rect width="125" height="100" fill="rgba(12,22,12,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          {/* Antenna cutout */}
          <rect x="100" y="8" width="22" height="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
          <text x="58" y="47" fill="rgba(255,255,255,0.12)" fontSize="9" fontFamily="monospace" textAnchor="middle">ESP32-C3</text>
          <text x="58" y="59" fill="rgba(255,255,255,0.07)" fontSize="7" fontFamily="monospace" textAnchor="middle">WROOM-02</text>
          {Array.from({length:9},(_,i)=>(
            <rect key={i} x={-8} y={8+i*9} width={8} height={5} fill="rgba(184,115,51,0.42)" rx="0.5"/>
          ))}
          {Array.from({length:9},(_,i)=>(
            <rect key={i} x={125} y={8+i*9} width={8} height={5} fill="rgba(184,115,51,0.42)" rx="0.5"/>
          ))}
          <text x="58" y="-11" fill="rgba(255,255,255,0.1)" fontSize="10" fontFamily="monospace" textAnchor="middle">U2</text>
        </g>

        {/* ── CRYSTAL Y1 ─────────────────────────────────────────── */}
        <g transform="translate(282,328)">
          <rect x="-9" y="3" width="9" height="9"  fill="rgba(184,115,51,0.35)"/>
          <rect x="55" y="3" width="9" height="9"  fill="rgba(184,115,51,0.35)"/>
          <rect width="55" height="15" rx="7" fill="rgba(180,165,80,0.22)" stroke="rgba(180,165,80,0.42)" strokeWidth="1"/>
          <text x="27" y="-7" fill="rgba(255,255,255,0.08)" fontSize="8" fontFamily="monospace" textAnchor="middle">Y1  8MHz</text>
        </g>

        {/* ── JTAG HEADER J1 2×5 ─────────────────────────────────── */}
        <g transform="translate(1358,132)">
          <text x="28" y="-9" fill="rgba(255,255,255,0.08)" fontSize="8" fontFamily="monospace" textAnchor="middle">J1  JTAG/SWD</text>
          {Array.from({length:5},(_,col)=>Array.from({length:2},(_,row)=>(
            <rect key={`${col}-${row}`} x={col*13} y={row*13} width={9} height={9} rx={row===0&&col===0?0:1.5}
              fill="rgba(184,115,51,0.38)" stroke="rgba(184,115,51,0.22)" strokeWidth="0.5"/>
          )))}
        </g>

        {/* ── LED D1 ─────────────────────────────────────────────── */}
        <g transform="translate(788,180)">
          <rect x="-18" y="-5" width="11" height="10" fill="rgba(184,115,51,0.35)"/>
          <rect x="23"  y="-5" width="11" height="10" fill="rgba(184,115,51,0.35)"/>
          <rect x="-5" y="-8" width="26" height="16" rx="4"
            fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.5)" strokeWidth="1" className="led"/>
          <circle cx="8" cy="0" r="5" fill="rgba(6,182,212,0.25)" className="led"/>
          <text x="8"  y="-16" fill="rgba(255,255,255,0.07)" fontSize="8" fontFamily="monospace" textAnchor="middle">D1  STATUS</text>
        </g>

        {/* ── RESISTORS ──────────────────────────────────────────── */}
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

        {/* ── DECOUPLING CAPS ────────────────────────────────────── */}
        {([[428,344,"C1"],[450,344,"C2"],[562,344,"C3"],[582,344,"C4"],[1093,303,"C5"],[1112,303,"C6"],[1182,303,"C7"],[1200,303,"C8"]
        ] as [number,number,string][]).map(([x,y,label])=>(
          <g key={label} transform={`translate(${x},${y})`}>
            <rect x={-4} y={-12} width={8} height={8}  fill="rgba(184,115,51,0.3)"/>
            <rect x={-4} y={9}   width={8} height={8}  fill="rgba(184,115,51,0.3)"/>
            <rect x={-5} y={-3}  width={10} height={12} fill="rgba(38,55,38,0.92)" stroke="rgba(184,115,51,0.22)" strokeWidth="0.5"/>
            {label==="C1"&&<text x="2" y={-18} fill="rgba(255,255,255,0.06)" fontSize="7" fontFamily="monospace">{label}</text>}
          </g>
        ))}

        {/* ── OSCILLOSCOPE SCREEN (near ESP32) ───────────────────── */}
        <g transform="translate(1280,590)">
          <rect width="130" height="55" rx="3" fill="rgba(0,20,5,0.85)" stroke="rgba(6,182,212,0.2)" strokeWidth="1"/>
          {/* Grid lines */}
          {[13,26,39,52].map(y=><line key={y} x1="0" y1={y} x2="130" y2={y} stroke="rgba(6,182,212,0.06)" strokeWidth="0.5"/>)}
          {[26,52,78,104].map(x=><line key={x} x1={x} y1="0" x2={x} y2="55" stroke="rgba(6,182,212,0.06)" strokeWidth="0.5"/>)}
          {/* Waveform */}
          <path d="M 5 28 Q 20 12 30 28 Q 40 44 50 28 Q 60 12 70 28 Q 80 44 90 28 Q 100 12 110 28 Q 120 44 125 28"
            stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="none" className="scope"/>
          <text x="2" y="-6" fill="rgba(255,255,255,0.07)" fontSize="7" fontFamily="monospace">CH1  500mV  1ms</text>
        </g>

        {/* ── SILKSCREEN TEXT ─────────────────────────────────────── */}
        <text x="75"  y="198" fill="rgba(255,255,255,0.045)" fontSize="8"  fontFamily="monospace">KJ-DEV-BOARD v2.1</text>
        <text x="75"  y="212" fill="rgba(255,255,255,0.03)"  fontSize="7"  fontFamily="monospace">© 2024 Kiran Jojare</text>
        <text x="1250" y="800" fill="rgba(255,255,255,0.03)" fontSize="8"  fontFamily="monospace">MADE WITH LOVE + SOLDER</text>
        <text x="75"  y="780" fill="rgba(255,255,255,0.03)"  fontSize="7"  fontFamily="monospace">ROHS COMPLIANT  FR4  1.6mm  2-LAYER</text>
        <text x="1300" y="85" fill="rgba(255,255,255,0.04)"  fontSize="8"  fontFamily="monospace">3V3  ──  5V  ──  GND</text>
      </svg>
    </div>
  )
}
