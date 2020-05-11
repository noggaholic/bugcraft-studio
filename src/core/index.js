import initialize from './initialize';

function launchCore(cb) {
  const createProgram = require('./manager.js');
  const patterns = require('./logic/patterns.js');
  const init = (err, process, module, memory, window) => {
    if (err) return cb(err);
    const program = createProgram(process, module, memory, window, patterns);
    return cb(err, program);
  };
  return initialize(init);
}

window.launch = launchCore;

// 1.12
// WoW.exe+31C13A - D9 59 FC              - fstp dword ptr [ecx-04]
// WoW.exe+31C13D - 8B 10                 - mov edx,[eax]
// WoW.exe+31C13F - 89 11                 - mov [ecx],edx
// WoW.exe+31C141 - 8B 50 04              - mov edx,[eax+04]
// WoW.exe+31C144 - 89 51 04              - mov [ecx+04],edx
// WoW.exe+31C147 - 8B 40 08              - mov eax,[eax+08]
// WoW.exe+31C14A - 89 41 08              - mov [ecx+08],eax
// WoW.exe+31C14D - 5D                    - pop ebp
// WoW.exe+31C14E - C2 0C00               - ret 000C { 12 }

// Disable all rendering
// WoW.exe+82ADA - E8 D11D2500           - call WoW.exe+2D48B0
// WoW.exe+82ADF - 8B 4D 08              - mov ecx,[ebp+08]
// WoW.exe+82AE2 - 8B F0                 - mov esi,eax
// WoW.exe+82AE4 - 8B 87 B8650000        - mov eax,[edi+000065B8]
// WoW.exe+82AEA - D9 40 3C              - fld dword ptr [eax+3C]
// WoW.exe+82AED - 89 4E 3C              - mov [esi+3C],ecx
// WoW.exe+82AF0 - D9 5E 34              - fstp dword ptr [esi+34]
// WoW.exe+82AF3 - E8 1895FAFF           - call WoW.exe+2C010
// WoW.exe+82AF8 - 89 45 F8              - mov [ebp-08],eax
// WoW.exe+82AFB - C7 45 FC 00000000     - mov [ebp-04],00000000 { 0 }
// WoW.exe+82B02 - DF 6D F8              - fild qword ptr [ebp-08]

// fstp may be related to fog?
// WoW.exe+2CEE67 - 8B 15 289CCE00        - mov edx,[WoW.exe+8E9C28] { [FF522A60] }
// WoW.exe+2CEE6D - D8 0D D89BCE00        - fmul dword ptr [WoW.exe+8E9BD8] { [388.89] }
// WoW.exe+2CEE73 - 8D 4D D4              - lea ecx,[ebp-2C]
// WoW.exe+2CEE76 - 89 15 D09BCE00        - mov [WoW.exe+8E9BD0],edx { [FF522A60] }
// WoW.exe+2CEE7C - C7 45 C0 00000000     - mov [ebp-40],00000000 { 0 }
// WoW.exe+2CEE83 - D9 1D D49BCE00        - fstp dword ptr [WoW.exe+8E9BD4] { [38.89] }
// WoW.exe+2CEE89 - C7 45 C4 00000000     - mov [ebp-3C],00000000 { 0 }
// WoW.exe+2CEE90 - C7 45 C8 00000000     - mov [ebp-38],00000000 { 0 }
// WoW.exe+2CEE97 - E8 74040000           - call WoW.exe+2CF310
// WoW.exe+2CEE9C - 8D 45 F0              - lea eax,[ebp-10]
// WoW.exe+2CEE9F - 50                    - push eax

// This string may be related to fog
// Near clip plane distance

// Funny value on fld
// WoW.exe+36CBB5 - 50                    - push eax
// WoW.exe+36CBB6 - E8 E5DEEDFF           - call WoW.exe+24AAA0
// WoW.exe+36CBBB - D9 05 74FD7F00        - fld dword ptr [WoW.exe+3FFD74] { [0.00] }
// WoW.exe+36CBC1 - D8D9                  - fcomp st(0),st(1)
// WoW.exe+36CBC3 - DFE0                  - fnstsw ax
// WoW.exe+36CBC5 - F6 C4 41              - test ah,41 { 65 }

// Fog en mayusculas


// Follow the rabbit:
// WoW.exe+272700 - A1 88B4C700           - mov eax,[WoW.exe+87B488] { [0000000A] }
// WoW.exe+272705 - D9 05 1025C600        - fld dword ptr [WoW.exe+862510] { [0.02] }
// WoW.exe+27270B - D9 1C 85 C831C600     - fstp dword ptr [eax*4+WoW.exe+8631C8]
// WoW.exe+272712 - 40                    - inc eax
// WoW.exe+272713 - 83 F8 1E              - cmp eax,1E { 30 }
// WoW.exe+272716 - A3 88B4C700           - mov [WoW.exe+87B488],eax { [0000000A] } <<<<< -
// WoW.exe+27271B - 75 0A                 - jne WoW.exe+272727
// WoW.exe+27271D - C7 05 88B4C700 00000000 - mov [WoW.exe+87B488],00000000 { [0000000A] }
//
// This may be related to fog
// WoW.exe+2CEE67 - 8B 15 289CCE00        - mov edx,[WoW.exe+8E9C28] { [FF000E20] }
// WoW.exe+2CEE6D - D8 0D D89BCE00        - fmul dword ptr [WoW.exe+8E9BD8] { [300.00] }
// WoW.exe+2CEE73 - 8D 4D D4              - lea ecx,[ebp-2C]
// WoW.exe+2CEE76 - 89 15 D09BCE00        - mov [WoW.exe+8E9BD0],edx { [FF000E20] }
// WoW.exe+2CEE7C - C7 45 C0 00000000     - mov [ebp-40],00000000 { 0 }
// WoW.exe+2CEE83 - D9 1D D49BCE00        - fstp dword ptr [WoW.exe+8E9BD4] { [75.00] }
// WoW.exe+2CEE89 - C7 45 C4 00000000     - mov [ebp-3C],00000000 { 0 }

//
// 00867964
// Terrain related

// fcomp enables a black strange effect
// WoW.exe+26FFAF - D8 0D 70FD7F00        - fmul dword ptr [WoW.exe+3FFD70] { [0.35] }
// WoW.exe+26FFB5 - D9 55 FC              - fst dword ptr [ebp-04]
// WoW.exe+26FFB8 - D8 1D 74FD7F00        - fcomp dword ptr [WoW.exe+3FFD74] { [00000000] }
// WoW.exe+26FFBE - DFE0                  - fnstsw ax
// WoW.exe+26FFC0 - F6 C4 44              - test ah,44 { 68 }


// Tumba
// 0.00 0.00 11.00 0.00 408.81 -2010.49 320.00 0.91 408.05 -2011.01 340.00 409.57 -2009.97 321.03 408.10 -2010.50 340.00 408.10 -2010.50 320.00 1.00 0.00 0.00 0.00

// D6 0E 30 41 C0 D8 91 2A 8A 67 CC 43 A7 4F FB C4 00 00 A0 43 86 94 69 3F D0 05 CC 43 57 60 FB C4 00 00 AA 43 43 C9 CC 43 F7 3E FB C4 A3 83 A0 43 C0 0C CC 43 10 50 FB C4 00 00 AA 43 C0 0C CC 43 10 50 FB C4 00 00 A0 43 00 00 80 3F 80 00 00 00 00 00 00 00 00 00 00 00

// this one works:
// 86 94 69 3F D0 05 CC 43 57 60 FB C4 00 00 AA 43 43 C9 CC 43
// 408.81

// good pattern
// 8A 67 CC 43 A7 4F FB C4 83 54 A0 43 86 94 69 3F D0 05 CC 43 57 60 FB C4 63 25 A0 43 43 C9 CC 43 F7 3E FB C4 A3 83 A0 43 C0 0C CC 43 10 50 FB C4 38 41 A0 43 C0 0C CC 43 10 50 FB C4 38 41 A0 43 00 00 80 3F 80 00 00 00
// 408,81 -2010,49 320,66 0,91 408,05 -2011,01 320,29 409,57 -2009,97 321,03 408,10 -2010,50 320,51 408,10 -2010,50 320,51 1,00 0,00

// x y z 8A 67 CC 43 A7 4F FB C4 83 54 A0 43

// 320.6602478
// 320.2920837
// 321.0284119
// 320.5095215
// 320.5095215
// 320.5095215

// Start of block terrain? 00 F0 E2 23 00 60 E1 05

// Time of day alpha vanilla E8 ?? ?? ?? 00 D9 ?? 04

// rendering control 4.3.4
// 55 8B EC A1 AC41E900 23 05 A841E900 A9 00000008 74 14 8B 0D 7CF4ED00 8B 11 8B 82 C4000000 6A 00 6A 08 FF D0 D9 45 0C 51 8B 4D 08 D9 1C 24 51 E8 07630000 8B 15 AC41E900 23 15 A841E900 83 C4 08 F7 C2 00000008 74 14 8B 0D 7CF4ED00 8B 01 8B 90 C4000000 6A 01 6A 08 FF D2  5D                   
// Default value 0001BFFF
// next to default 1.890624881

// whole row FF BF 01 00 FF FF F1 3F FF FF FF FF 00 00 00 00 00 00 00 00 00 00 00 00
// near 00 C0 35 44 00 C0 35 44
// 40 00 00 00 00 C0 35 44 00 C0 35 44

 // 3.3.5a and 2.4.3 patterns for rendering 0F84 ?? ?? ?? ?? F7 05 ?? ?? ?? ?? 00002000
 // CTL and above 55 8B EC A1 ???????? 23 05 ???????? A9 00000008         
 // CTL and above FF BF 01 00 FF FF F1 7F FF FF FF FF 
 // CTL and above, this one works 00 00 C8 46 00 00 00 00
 // Legion working 55 8B EC 83 7D 0C 00 8B 45 08 74 08 09 05 ????????
 // 0.5.3 .port -1315 -1216 60.0582 0
 // rendering 0.5.3 top lighting 80 99 90 07
 // only wmo wireframe 74 4B 10 31
 // more clear 755500FF