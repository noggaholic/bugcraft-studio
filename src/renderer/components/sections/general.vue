<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <div class="tile">
          <article class="tile is-child notification is-primary">
            <p class="title">Welcome to Bugcraft studio</p>
            <p class="subtitle">
              In exploration, you have to take risks. I've spent many years of my life in the pursuit of new frontiers and hidden worlds.
            </p>
            <p class="subtitle">
              My passion for this has driven my career. Being part of the Nogg-Aholic back in the old days made me be curious about the world.
            </p>
            <p class="subtitle">
              I present this tool for your pleasure. I hope it brings you joy and encouragement to be curious about the outside world. The time has come for you to explore without limits.
            </p>
            <p class="subtitle">
              <i>karliky (aka Bugcraft)</i>
            </p>
            <small>Version: {{version}}</small>
          </article>
        </div>
      </div>
      <div class="column">
        <div class="promo">
          <div
            v-for="(promo, index) in promoItems"
            :key="`promo-${index}`"
            v-on:click="open(promo)"
            class="promo_box">
            <img :src="`imgs/${promo.img}`" alt />
            <div class="banner">
              <div class="banner__text">
                <div class="banner__title">{{promo.title}}</div>
                <div class="banner__desc">{{promo.description}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO: I have to put these images here so webpack moves them to the correct path. -->
    <img style="display:none" src="../../assets/promo-gm-island.png" alt="">
    <img style="display:none" src="../../assets/promo-alpha-core.png" alt="">
    <img style="display:none" src="../../assets/promo-exploration-reboot.png" alt="">
    <img style="display:none" src="../../assets/promo-hayven.png" alt="">
    <img style="display:none" src="../../assets/promo-meisio.png" alt="">
  </section>
</template>

<script>
const { version } = require("../../../../package.json");
const { shell, remote } = require('electron');

const promoItems = [
  {
    img: "promo-gm-island.png",
    title: "Hidden WoW",
    url: 'https://www.reddit.com/r/hiddenwow/',
    description: "Sub-reddit with a collection of WoW secrets."
  },
  {
    img: "promo-alpha-core.png",
    title: "Alpha Project",
    url: 'https://discord.gg/RzBMAKU',
    description: "Discord community building an amazing 0.5.3 server."
  },
  {
    img: "promo-exploration-reboot.png",
    title: "Exploration Reboot",
    url: 'https://discord.gg/juNuxhp',
    description: "A World of Warcraft Exploration Community."
  },
  {
    img: "promo-hayven.png",
    title: "Hayven Games",
    url: 'https://www.youtube.com/channel/UCjVDQloX4cIpGqpM6mdyD2Q',
    description: "World of WarCraft from a new perspective."
  },
  {
    img: "promo-meisio.png",
    title: "Meisio",
    url: 'https://www.youtube.com/user/meisiomeio',
    description: "Youtube channel focused on ASMR WoW videos."
  }
];

const promoSelection = promoItems
  .sort(() => Math.random() - Math.random())
  .slice(0, 4);

export default {
  name: "general",
  mounted() {},
  methods: {
    open(promo) {
      shell.openExternal(promo.url);
    },
  },
  data: () => ({
    version,
    promoItems: promoSelection
  })
};
</script>

<style scoped>
.tile {
  height: 100%;
}

.title {
  font-size: 1.9rem;
}

.subtitle {
  font-size: 0.9rem;
}

.is-primary {
  background-color: #10141c;
}

.section {
  padding: 10px;
}
.promo {
  display: flex;
  align-items: center;
}
.promo > .promo_box {
  width: 150px;
  height: 300px;
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.64);
}
.promo > .promo_box > img {
  width: 150px;
}
.promo > .promo_box > .banner {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  height: 80px;
  width: 100%;
  margin-bottom: -2px;
  padding: 5px;
}
.promo > .promo_box > .banner .banner__title {
  font-weight: bold;
}
.promo > .promo_box > .banner .banner__desc {
  font-size: 0.85em;
  color: rgb(233, 233, 233);
}
.promo > .promo_box > .banner .banner__text {
  transition: all 0.3s;
  transform: translateY(calc(30px + 1em));
  text-shadow: 0px 0px 5px rgb(0, 0, 0);
}
.promo > .promo_box:hover .banner__text {
  transition: all 0.3s;
  transform: translateY(calc(-25px + 1em));
}
.subtitle {
  margin-bottom: 0.5rem;
}

.subtitle:last-child {
  margin-bottom: 0.5rem;
}

article > p:nth-child(5) {
  margin-bottom: 0.5rem;
  text-align: right;
}
</style>