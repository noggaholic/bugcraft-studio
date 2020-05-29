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
 // only near 09D2F824

 // coffin thing 00 00 80 3F C0 0C CC 43 10 50 FB C4 00 00 AA 43
 // position C0 0C CC 43 10 50 FB C4 38 41 A0 43 00 00 80 3F C0 0C CC 43 10 50 FB C4 38 41 A0 43
 // 408.0996094 -2010.501953 320.5095215
 // XYZ Tree 1114.70 105.7089844 222.2225342
 // render doodads 85 C0 8D B3 58010000 89 4D BC 74 22
 // lea instruction works Z 0F84 58010000        8D B3 F0000000       B9 10000000          8D 7D C0             
// kalidar tree 68 56 8B 44 00 6B D3 42 F8 38 5E 43 00 00 80 3F C7 F1 89 44 41 53 C2 42 D0 81 5B 43 69 CA 8C 44 F3 A1 F3 42 E0 98 86 43 A8 00 78 16 4E 4E 00 00
// start of kalidar tree 14 D8 7F BF BA F2 0E 3D 00 00 00 00 00 00 00 00 BA F2 0E BD 14 D8 7F BF 00 00 00 00 00 00 00 00
// renderdoodads DCFF 85 C0 0F84 58010000 8D B3 F0000000 B9 10000000 8D 7D C0 F3 A5                
// Binary pattern for FOG from alpha to vanilla 1.12.x D9 05 ???????? 8B 15 ???????? D8 0D ???????? 
// For 2.4.3 and above                                 D9 05 ???????? 89 0D ???????? D8 0D ???????? 
// So from Alpha 0.5.3 to 2.4.3 use this D9 05 ???????? ?? ??  ???????? D8 0D ???????? and it's the first occurrence
// 4.3.4 F3 0F11 35 ???????? F3 0F11 2D ???????? F3 0F11 05 ???????? 89 15 ???????? it's first ocurrence 
// 5.4.8 F3 0F11 86 ??000000  F3 0F11 8E ??000000  89 8E ??000000 it's first ocurrence 
// 7.2.5 Legion 89 87 B8000000 F3 0F11 8F B4000000  F3 0F59 C2 F3 0F11 87 B0000000  
// about fog, looking for 18402 / 43032.65625 / 18403 inside wow.exe module may help to find Fog area
// SetPlanets D9 15 88160B01       D9 05 44198100       D8 25 181A8100       D9 1D 8C160B01       D9 05 38198100       D8 0D 342A8000       D9 15 90160B01
// DayNightUpdateLightning 75 23                E8 9CDEFFFF          E8 07F3FFFF          E8 72F4FFFF          B9 70210B01          E8 A8B3FFFF          B9 F81F0B01          E9 FED4FFFF          
// where render happens E8 3D2F0000          E8 98320000          E8 73340000          E8 CE370000          E8 99390000          E8 643B0000          
// wow 1.12.1 rendering 8D 45 C0             89 55 C8             50                   8D 95 74FFFFFF       8D 4D E4             E8 B4CA1E00           Enables took me here F7 05 ???????? 00000002 Disable render E8 44821000          8B CE                E8 2D000000          
// this one is really cool E8 48A3E1FF          8B 4F 18             85 C9                74 05                
// For Scene render call F7 05 ???????? 00000002
// WoWClient.CWorld::Render+28 - E8 53750000           - call WoWClient.CWorldScene::Render
// WoWClient.CWorld::Render+2D - F7 05 6C04E400 00000002 - test [WoWClient.CWorld::enables],02000000 { (07104B73),33554432 }
// wow 1.12 scene render? 
// WoW.exe+83460 - 55                    - push ebp
// WoW.exe+83461 - 8B EC                 - mov ebp,esp
// WoW.exe+83463 - 83 EC 2C              - sub esp,2C { 44 }
// WoW.exe+83466 - 57                    - push edi
// WoW.exe+83467 - 8B F9                 - mov edi,ecx
// WoW.exe+83469 - E8 92DEF7FF           - call WoW.exe+1300
// WoW.exe+8346E - 8B C8                 - mov ecx,eax
// WoW.exe+83470 - E8 8B392800           - call WoW.exe+306E00
// WoW.exe+83475 - 8D 4D D4              - lea ecx,[ebp-2C]
// WoW.exe+83478 - C7 45 D4 00000000     - mov [ebp-2C],00000000 { 0 }
// WoW.exe+8347F - C7 45 D8 00000000     - mov [ebp-28],00000000 { 0 }
// WoW.exe+83486 - C7 45 DC 00000000     - mov [ebp-24],00000000 { 0 }
// WoW.exe+8348D - C7 45 E0 00000000     - mov [ebp-20],00000000 { 0 }
// 0.5.3 WoWClient.DayNightRenderSky+8B - E9 2024FEFF           - jmp WoWClient.DNClouds::Render
// 1.12.1 funny low poly mode WoW.exe+8368F - D9 05 A0B4C700        - fld dword ptr [WoW.exe+87B4A0] { (0.00) }
// 1.12.1 disable m2 rendering WoW.exe+836A6 - E8 55522800           - call WoW.exe+308900
// 1.12.1 disable grass rendering WoW.exe+836CA - E8 F1CA1E00           - call WoW.exe+2701C0
// 1.12.1 disable ocean WoW.exe+836E4 - E8 E7CA1E00           - call WoW.exe+2701D0
// 1.12.1 all black. culling related WoW.exe+8361D - E8 8ECB1E00           - call WoW.exe+2701B0
// 1.12.1 disable WMO WoW.exe+2812B6 - E8 85350000           - call WoW.exe+284840
// 2.4.3 render M2s wow.exe+2998A0 - E8 BBFCFFFF           - call wow.exe+299560
// 2.4.3 Terrain and M2 wow.exe+299877 - E8 E493FFFF           - call wow.exe+292C60
// 2.4.3 Terrain wow.exe+2998A9 - E8 B293FFFF           - call wow.exe+292C60
// 2.4.3 Disable WMO wow.exe+29A122 - E8 A9FDFFFF           - call wow.exe+299ED0
// 2.4.3 Disable Liquids wow.exe+29A12A - E8 11B3FFFF           - call wow.exe+295440
// 2.4.3 Disable render objects (npcs) wow.exe+29A140 - E8 6BADFFFF           - call wow.exe+294EB0
// 2.4.3 Disable M2 inside WMO wow.exe+29A146 - E8 A5B1FFFF           - call wow.exe+2952F0
// 2.4.3 Disable everything but horizon wow.exe+29A441 - E8 7AFCFFFF           - call wow.exe+29A0C0
// 3.3.5.a Wow.exe+399E3F - E8 3CFBFFFF           - call Wow.exe+399980
// 3.3.5.a Map and Doodads Wow.exe+39A7F2 - E8 49F5FFFF           - call Wow.exe+399D40
// 4.3.4 called per frame? wow.exe+354392 - 75 12                 - jne wow.exe+3543A6
// 4.3.4 probably ignore me wow.exe+201937 - F3 0F10 15 6067EF00   - movss xmm2,[wow.exe+7B6760] { (-340282346638528860000000000000000000000.00) }
// 4.3.4 Fog related? wow.exe+4E4BDE - E8 BD70FBFF           - call wow.exe+49BCA0
// 4.3.4 This renders a lot of things wow.exe+4E2D30 - E8 8B0EC8FF           - call wow.exe+163BC0


// Common pattern 01 00 00 00 3A 12 0A 43 00 40 1C C6 AB 6A 2D 44
// 3.3.5a Wow.exe+393813 - E8 F8C20300           - call Wow.exe+3CFB10
// 4.3.4 may be related with rendering wow.exe+6C3188 - D8 0D E4902301        - fmul dword ptr [wow.exe+7890E4] { (1333788672) }
//wow.exe+35CBA4 - E8 B7AAFFFF           - call wow.exe+357660


// 4.3.4 this is environment wow.exe+35D266 - E8 6569FFFF           - call wow.exe+353BD0
// 4.3.4 water related wow.exe+328B2D - D9 05 58752701        - fld dword ptr [wow.exe+7C7558] { (0.94) }
// 4.3.4 everything wow.exe+328B9D - E8 DEA90200           - call wow.exe+353580
// M2 and objects wow.exe+328C23 - E8 28F90F00           - call wow.exe+428550
// This is dark wow.exe+35B97F - E8 4C9EFFFF           - call wow.exe+3557D0
// water and grass wow.exe+35B986 - E8 D59FFFFF           - call wow.exe+355960
// 4.3.4 m2 reading wow.exe+357BB8 - E8 C3CCFFFF           - call wow.exe+354880
// 4.3.4 M2 in WMO ? wow.exe+9DFD - F3 0F10 42 30         - movss xmm0,[edx+30]
// 4.3.4 Water related wow.exe+39ECD6 - F3 0F10 05 B47D2601   - movss xmm0,[wow.exe+7C7DB4] { (1111.11) }
// 4.3.4 Everything but shadows. wow.exe+4E297D - E8 DE3DE4FF - call wow.exe+326760 I got here by looking for { (1111.11) } and going up in the stack trace
// 4.3.4 same as above wow.exe+4E3177 - E8 F4F4FFFF           - call wow.exe+4E2670
// 4.3.4 white screen wow.exe+4E4F94 - E8 37DDFFFF           - call wow.exe+4E2CD0
// 4.3.4 when setting this to 0.1 and going back to 1 it shows a debug black window, console? wow.exe+4E4E1C - F3 0F10 0D 00762201   - movss xmm1,[wow.exe+787600] { (1.00) }
// 4.3.4 related to above Weather changed to 0, intensity 0.000000
// 4.3.4 rendering functions 00F84E10 0107DED0 00BC0710 00F84E10 0107DED0 00BC0710
// 4.3.4 WMO pattern 75 ?? 85 DB 75 0A
// 4.3.5 I found this by looking at 3.3.5a WMO access in EBX and these values wow.exe+9BE8 - F3 0F10 42 10         - movss xmm0,[edx+10]
// 70 D0 29 13 F0 D2 29 13 FF FF FF FF 74 8B 1E 46 7C 0B BC C5 31 E2 75 42 33 66 1C 46 73 F9 BF C5 17 B0 08 C2 4E CD 20 46 E6 F6 B6 C5 DD 1E 60 43 C0 99 1E 46 2C 78 BB C5 D8 F2 BD 42 80 1C 4A 43 05 A6 BB BE DA 2F 6E BF 00 00 00 00 00 00 00
// Ok so in 3.3.5a changing Wow.exe+39A22B - 75 1D                 - jne Wow.exe+39A24A disables WMO rendering.
// 4.3.4 This looks related to the same values of 3.3.5a wow.exe+24F66E - 89 46 0C              - mov [esi+0C],eax
// 4.3.4 Disable everything but objects E8 DE3DE4FF          
// WMO Common pattern 74 8B 1E 46 7C 0B BC C5
// 4.3.4 WMO rendering related wow.exe+39F37E - 39 46 50              - cmp [esi+50],eax
// 4.3.4 WMO Rendering change this wow.exe+39F378 - 8B 87 94000000        - mov eax,[edi+00000094] to 00000090
