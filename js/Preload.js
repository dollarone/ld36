var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('logo-tiles', 'assets/images/logo-tiles.png', 17, 16);
    this.game.load.spritesheet('tiles', 'assets/images/tiles.png', 16, 16);
    this.game.load.spritesheet('lance', 'assets/images/lance.png', 32, 64);
    this.game.load.spritesheet('laser', 'assets/images/laser.png', 16, 16);
    this.game.load.spritesheet('energy', 'assets/images/energy.png', 13, 13);
    this.game.load.spritesheet('laserplosion', 'assets/images/laserplosion.png', 16, 16);
    this.game.load.spritesheet('blob', 'assets/images/blob.png', 32, 32);
    this.game.load.spritesheet('bat', 'assets/images/bat.png', 32, 16);
    this.game.load.spritesheet('items', 'assets/images/items.png', 32, 32);
    this.game.load.image('laserbeam', 'assets/images/laserbeam.png');
    this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('blackpixel', 'assets/images/blackpixel.png');
    this.game.load.image('purplepixel', 'assets/images/purplepixel.png');
    this.game.load.image('darkness', 'assets/images/darkness2.png');

    this.game.load.audio('music', 'assets/audio/music.ogg');
    this.game.load.audio('laser', 'assets/audio/laser.ogg');
    this.game.load.audio('roar', 'assets/audio/roar.ogg');
    this.game.load.audio('grunt', 'assets/audio/grunt.ogg');
    this.game.load.audio('hit', 'assets/audio/hit.ogg');
    this.game.load.audio('bat', 'assets/audio/bat.ogg');
    this.game.load.audio('ouch1', 'assets/audio/ouch1.ogg');
    this.game.load.audio('ouch2', 'assets/audio/ouch2.ogg');

    this.game.load.audio('music-bass1', 'assets/audio/ld36-bass1.ogg');
    this.game.load.audio('music-bass2', 'assets/audio/ld36-bass2.ogg');
    this.game.load.audio('music-bass3', 'assets/audio/ld36-bass3.ogg');
    this.game.load.audio('music-bass4', 'assets/audio/ld36-bass4.ogg');
    this.game.load.audio('music-bass5', 'assets/audio/ld36-bass5.ogg');
    this.game.load.audio('music-bass6', 'assets/audio/ld36-bass5-bow.ogg');
    this.game.load.audio('music-basslap', 'assets/audio/ld36-basslap.ogg');
    this.game.load.audio('music-leitmotif', 'assets/audio/ld36-leitmotif.ogg');
    this.game.load.audio('music-melody', 'assets/audio/ld36-melody.ogg');
    this.game.load.audio('music-melody2', 'assets/audio/ld36-melody2.ogg');
    this.game.load.audio('music-mood1', 'assets/audio/ld36-mood1.ogg');
    this.game.load.audio('music-mood2', 'assets/audio/ld36-mood2.ogg');
    this.game.load.audio('music-mood3', 'assets/audio/ld36-mood3.ogg');
    this.game.load.audio('music-mood4', 'assets/audio/ld36-mood4.ogg');
    this.game.load.audio('music-mood5', 'assets/audio/ld36-mood5.ogg');
    this.game.load.audio('music-mood6', 'assets/audio/ld36-mood6.ogg');
    this.game.load.audio('music-mood7', 'assets/audio/ld36-mood7.ogg');
    this.game.load.audio('music-mood8', 'assets/audio/ld36-mood8.ogg');
    this.game.load.audio('music-mood-intro', 'assets/audio/ld36-mood-intro.ogg');
    this.game.load.audio('music-track1', 'assets/audio/ld36-track1.ogg');
    this.game.load.audio('music-track2', 'assets/audio/ld36-track2.ogg');
    this.game.load.audio('music-track3', 'assets/audio/ld36-track3.ogg');

    this.game.load.spritesheet('watcher', 'assets/images/watcher.png', 48, 48);
    this.game.load.spritesheet('watcher-anim', 'assets/images/watcher-anim.png', 42, 64);

  },
  create: function() {
    var colour = "000";
    var timeout = 2;
    this.state.start('Logo', true, false, colour, timeout);
                                          // armour, boots, mask, springBoots
    //this.state.start('Ending', true, false, false, false, false, false);
  }
};
