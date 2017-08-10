import initialize from './initialize';

function launchCore(cb) {
  const createProgram = require('./manager.js');
  const patterns = require('./logic/patterns.js');
  const init = (err, process, module, memory, window) => {
    if (err) {
      return cb(err);
    }

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
