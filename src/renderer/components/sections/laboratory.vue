<template>
  <div class="container">
    <div class="tabs is-boxed">
      <settingsMenu></settingsMenu>
    </div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">laboratory control.</h1>
          <h2 class="subtitle">Nothing implemented yet.</h2>
        </div>
      </div>
    </section>
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <article class="message">
          <div class="message-header">
            <p>About this tool</p>
          </div>
          <div class="message-body">
            This is presented as a work of fiction and dedicated to the Nogg-aholic people. You are never too old to set another goal or to dream a new dream.
            <br />
            <i>
              For Dopefish, Cryect, Malu05, LadyCircus, Marlamin, Kruithne, akspa420,
              Gnauren(Bemoliph), Shn, Ch0p, Tigers, Xayo, Hergonan,
              Mysterious, NiNtoxicated, Forg, G33k, B4t4dead,
              MoD, Schlumpf_, Suchtino, John Staats, D3s7r0, Nayra, Akg,
              Witchsong, Zintos, Zor, Alram, Thunder, Dotted,
              Floodge, Alogon, Chosi, ClawX, Cybimaus, Syselkitna, Deletio,Drejjmit,
              Thierry Cantet, LadislavZezula, Stiven_SRB, Michael Zahn (Michii09), Maku,
              EvelynOFF, Funkeh, IeMag, Intenso, Jepz, KaNNis|ZzZ, KavSelj, MantaZZz,
              MiRia, Morbe, mrd3wd, Najimi, Riqpe, Sikk, Tetsu, Meisio and those who I forgot their name but live in my heart.
            </i>
            <br>
            World of Warcraft® and Blizzard Entertainment® are 
            all trademarks or registered trademarks of Blizzard 
            Entertainment in the United States and/or other 
            countries. These terms and all related materials, 
            logos, and images are copyright © Blizzard 
            Entertainment. This site is in no way associated with 
            or endorsed by Blizzard Entertainment®.”
          </div>
        </article>
      </div>
      <button class="modal-close is-large" v-on:click="closeSecret" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
const allowedKeys = { 78: 'n', 79: 'o', 71: 'g', 65: 'a', 72: 'h', 76: 'l', 73: 'i', 67: 'c' };
const code = ['n', 'o', 'g', 'g', 'a', 'h', 'o', 'l', 'i', 'c'];
let codePos = 0;
function secret(e) {
  const key = allowedKeys[e.keyCode];
  const requiredKey = code[codePos];
  if (key == requiredKey) {
    codePos++;
    if (codePos == code.length) {
      wellDone();
      codePos = 0;
    }
  } else {
    codePos = 0;
  }
}

function wellDone() {
  document.querySelector('.modal').classList.add('is-active');
  alert("You can clip our wings but we'll always remember what it was like to fly!");
}

export default {
  name: "laboratory",
  components: {
    settingsMenu: require("./settingsMenu")
  },
  created() {
    document.addEventListener('keydown', secret);
  },
  destroyed() {
    document.removeEventListener('keydown', secret);
  },
  methods: {
    closeSecret(closeElement) {
      const modal = closeElement.target.parentElement;
      modal.classList.remove("is-active");
    }
  },
  data() {
    return {};
  }
};
</script>
