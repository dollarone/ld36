var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
    create: function() {

        //  A simple background for our game
//        this.game.add.sprite(0, 0, 'sky');

        //statics
        this.damageCooldownSetting = 150;
        this.dead = false;
        this.deadWatchers = 0;
        this.countdownOn = false;
        this.map = this.game.add.tilemap('level1');

        this.map.addTilesetImage('tiles', 'tiles');

        //this.blockedLayer = this.map.createLayer('objectLayer');
        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');
        //this.foregroundLayer = this.map.createLayer('foregroundLayer');

        this.map.setCollisionBetween(1, 10000, true, 'blockedLayer');

        // make the world boundaries fit the ones in the tiled map
        this.blockedLayer.resizeWorld();

        var result = this.findObjectsByType('playerStart', this.map, 'objectLayer');
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'lance');//800, 383, 'lance');
        this.player.frame = 0; 
        this.player.direction = 1;
        this.player.crouched = false;
        this.player.actuallyCrouched = false;


        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);
        //this.game.camera.setSize(this.game.world.width, this.game.world.height);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 400;
        this.player.anchor.setTo(0.5);
        this.player.body.collideWorldBounds = false;

        //this.game.camera.follow(this.player);

        //  Our two animations, walking left and right.
        this.player.animations.add('idle', [2,2,2,2,2,2,13,13,2,2,2,2,2,2,2,2,2,2,2,2,2,13,13,2,2,2,2,2,2,1,1,2,2,1,1,2,2,13,13,2,2,2,2,2,2,2,2,2,2,13,2,2,2,2,2,2,2,2,1,1,2,3,4,5,6,5,2,2,2,2,2,2,13,13,2,2,2,2], 4, true);
        this.player.animations.add('left', [7,8,9,10], 10, true);
        this.player.animations.add('right', [7,8,9,10], 10, true);
        this.player.animations.add('crouch', [14,15], 6, false);

        this.player.tintCooldown = 0;
        this.player.damageCooldown = 0;
        this.player.life = 10;
        this.player.armour = false;
        this.player.themask = false;
        this.player.rocketBoots = false;
        this.player.springBoots = false;
        this.player.direction = -1;
        this.player.scale.setTo(-1,1);

        //  Pre-generate laser beams
        this.lasers = this.game.add.group();

        //  We will enable physics for any star that is created in this group
        this.lasers.enableBody = true;

        this.game.camera.x = 481;
        this.game.camera.y = 40;

        this.currentLaser = 0;
        
        this.laserArray = [];
        for (var i = 0; i < 30; i++)
        {
            //  Create a star inside of the 'stars' group
            var laserbeam = this.lasers.create(0, -200, 'laserbeam');

            //  No gravity 
            laserbeam.body.gravity.y = 0;
            laserbeam.anchor.setTo(0.5);
            laserbeam.available = true;
            this.laserArray.push(laserbeam);
        }

        this.sfx_laser = this.game.add.audio('laser');
        this.sfx_laser.volume = 0.4;
        this.sfx_roar = this.game.add.audio('roar');
        this.sfx_grunt = this.game.add.audio('grunt');
        this.sfx_hit = this.game.add.audio('hit');
        this.sfx_bat = this.game.add.audio('bat');
        this.sfx_bat.volume = 0.2;

        this.sfx_ouch1 = this.game.add.audio('ouch1');
        this.sfx_ouch2 = this.game.add.audio('ouch2');

        this.music_leitmotif = this.game.add.audio('music-leitmoif');
        this.music_melody1 = this.game.add.audio('music-melody');
        this.music_melody2 = this.game.add.audio('music-melody2');

        this.music_bass1 = this.game.add.audio('music-bass1');
        this.music_bass2 = this.game.add.audio('music-bass2');
        this.music_bass3 = this.game.add.audio('music-bass3');
        this.music_bass4 = this.game.add.audio('music-bass4');
        this.music_bass5 = this.game.add.audio('music-bass5');
        this.music_bass6 = this.game.add.audio('music-bass6');
        this.music_bass7 = this.game.add.audio('music-basslap');

        this.music_mood1 = this.game.add.audio('music-mood1');
        this.music_mood2 = this.game.add.audio('music-mood2');
        this.music_mood3 = this.game.add.audio('music-mood3');
        this.music_mood4 = this.game.add.audio('music-mood4');
        this.music_mood5 = this.game.add.audio('music-mood5');
        this.music_mood6 = this.game.add.audio('music-mood6');
        this.music_mood7 = this.game.add.audio('music-mood7');
        this.music_mood8 = this.game.add.audio('music-mood8');
        this.music_mood9 = this.game.add.audio('music-mood-intro');

        this.music_track1 = this.game.add.audio('music-track1');
        this.music_track2 = this.game.add.audio('music-track2');
        this.music_track3 = this.game.add.audio('music-track3');

        this.music_track1.volume = 0.5;
        this.music_track2.volume = 0.5;
        this.music_track3.volume = 0.5;

        this.music_bass = [];
        this.music_bass.push(this.music_bass1);
        this.music_bass.push(this.music_bass2);
        this.music_bass.push(this.music_bass3);
        this.music_bass.push(this.music_bass4);
        this.music_bass.push(this.music_bass5);
        this.music_bass.push(this.music_bass6);
        this.music_bass.push(this.music_bass7);
        
        this.music_mood = [];
        this.music_mood.push(this.music_mood1);
        this.music_mood.push(this.music_mood2);
        this.music_mood.push(this.music_mood3);
        this.music_mood.push(this.music_mood4);
        this.music_mood.push(this.music_mood5);
        this.music_mood.push(this.music_mood6);
        this.music_mood.push(this.music_mood7);
        this.music_mood.push(this.music_mood8);

        this.music_track = [];
        this.music_track.push(this.music_track1);
        this.music_track.push(this.music_track2);
        this.music_track.push(this.music_track3);



        this.currentBass = this.game.rnd.integerInRange(0,6);
        this.currentMood = this.game.rnd.integerInRange(0,7);
        this.currentTrack = this.game.rnd.integerInRange(0,2);

        this.playRandomBass();
        this.playRandomMood();

        this.timer = 0;

        this.showDebug = false;

        this.laserGun = this.player.addChild(this.game.make.sprite(12, 25, 'laser'));
        this.laserGun.anchor.setTo(0.5);
        this.laserGun.animations.add('shoot', [0,1,2,0], 10, false);

        this.noBoots = -170;
        this.springBoots = -350;
        this.rocketBoots = -300;
        this.normalBoots = -290;
        this.rocketBootsCooldown = 0;


        this.creatures = this.game.add.group();
        this.creatures.enableBody = true;
        var creaturesToBeAdded = this.findObjectsByType('monster', this.map, 'objectLayer');
        for (var i = 0; i < creaturesToBeAdded.length; i++) {
            //  Create a star inside of the 'stars' group
            var monsterType = creaturesToBeAdded[i].properties.monsterType;
            var creature = null;
            if (monsterType == "blob") {

                creature = this.creatures.create(creaturesToBeAdded[i].x, creaturesToBeAdded[i].y, monsterType);

                //  No gravity 
                creature.body.gravity.y = 0;
                creature.anchor.setTo(0.5);
                creature.dangerous = true;
                creature.animations.add("idle", [0,1,2,3,12,13,0,1,12,13], 6, true);
                creature.animations.add("jump_attack", [15, 14], 7, true);
                creature.animations.add("land", [16,17,18,19], 12, false);
                creature.animations.add("attack", [20,21,22,23,19], 12, true);
                creature.animations.add("deathFall", [4,7,7,7,8,8,8], 12, false);
                creature.animations.add("deathSplat", [9,10,11], 12, false);
                creature.animations.add("death", [9,10,11], 12, false);
                creature.animations.add("playerDeath", [20,21,22,23,19], 5, false);
                creature.body.velocity.x = this.game.rnd.integerInRange(2,5);
                creature.baseSpeed = creature.body.velocity.x;
                creature.state = "hanging";
                creature.monsterType = monsterType;
                creature.attackSpeed = 40;
                creature.attackJump = 30;
                creature.direction = 1;
                creature.animations.play("idle");
            }
            else if (monsterType == "watcher") {
                creature = this.creatures.create(creaturesToBeAdded[i].x, creaturesToBeAdded[i].y, "watcher-anim");

                //  No gravity 
                creature.body.gravity.y = 400;
                creature.anchor.setTo(0.5);
                creature.dangerous = true;
                creature.animations.add("idle", [4], 1, true);
                creature.animations.add("playerDeath", [4], 1, true);
                creature.animations.add("attack", [0,1,2,3], 8, true);
                creature.animations.add("death", [6,7,8,9,10,11,12,13,14], 12, false);
                creature.animations.add("deathSplat", [0], 12, false);
                creature.body.velocity.x = 0;
                creature.attackSpeed = 270;
                creature.attackJump = 280;
                creature.state = "waiting";
                creature.monsterType = monsterType;
  //              creature.animations.play("idle");
                creature.frame = 4;
                creature.direction = 1;
                creature.baseSpeed = 100;

                creature.triggerMusic = creaturesToBeAdded[i].properties.triggerMusic;
            }
            else if (monsterType == "bat") {
                creature = this.creatures.create(creaturesToBeAdded[i].x, creaturesToBeAdded[i].y, "bat");

                //  No gravity 
                creature.body.gravity.y = 40;
                creature.anchor.setTo(0.5);
                creature.dangerous = true;
                creature.animations.add("idle", [0,1], 6, true);
                creature.animations.add("playerDeath", [0,1], 8, true);
                creature.animations.add("attack", [0,1], 6, true);
                creature.animations.add("death", [2,3,4], 12, false);
                creature.animations.add("deathSplat", [4], 12, false);
                creature.body.velocity.x = this.game.rnd.integerInRange(20,50);
                creature.baseSpeed = creature.body.velocity.x;
                creature.direction = 1;
                if (this.game.rnd.integerInRange(0,1) == 0) {
                    creature.direction = -1;
                    creature.body.velocity.x *= -1;
                    creature.scale.setTo(-1,1);
                }
                creature.attackSpeed = 100;
                creature.attackJump = 20;
                creature.state = "flying";
                creature.monsterType = monsterType;
                creature.animations.play("idle");
                creature.body.setSize(32,32,0,0);
                
            }
            
            creature.stillAlive = true;
            creature.splat = false;
        }


        this.findableItems = this.game.add.group();
        this.findableItems.enableBody = true;
        var itemsToBeAdded = this.findObjectsByType('item', this.map, 'objectLayer');
        for (var i = 0; i < itemsToBeAdded.length; i++) {
            var itemType = itemsToBeAdded[i].properties.itemType;
            
            var item = this.findableItems.create(itemsToBeAdded[i].x, itemsToBeAdded[i].y, "tiles");
            item.frame = parseInt(itemsToBeAdded[i].properties.itemFrame);
            item.itemType = itemType;


            item.body.gravity.y = 0;
        }


        this.player.boots = this.normalBoots;

        this.key_Z = this.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.key_Z.onDown.add(this.gunfired, this);

        this.key_Q = this.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.key_Q.onDown.add(this.gunfired, this);
        this.key_X = this.input.keyboard.addKey(Phaser.Keyboard.X);
        this.key_X.onDown.add(this.gunfired, this);
        this.key_C = this.input.keyboard.addKey(Phaser.Keyboard.C);
        this.key_C.onDown.add(this.gunfired, this);
        this.key_V = this.input.keyboard.addKey(Phaser.Keyboard.V);
        this.key_V.onDown.add(this.gunfired, this);
/*
        this.key_right = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.key_right.onDown.add(this.move, this);
        this.key_left = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.key_left.onDown.add(this.move, this);
        */
        // do this to reset animation
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.key_up = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.key_up.onDown.add(this.jump, this);

        this.key_down = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.key_down.onDown.add(this.crouch, this);
        this.key_down.onUp.add(this.notCrouch, this);


        this.purpleOverlay = this.game.add.sprite(this.game.camera.x, this.game.camera.y, 'purplepixel');
        this.purpleOverlay.scale.setTo(480,56);
        //this.purpleOverlay.anchor.setTo(0.5);

        this.blackOverlay = this.game.add.sprite(this.game.camera.x+1, this.game.camera.y+1, 'blackpixel');
        this.blackOverlay.scale.setTo(478,54);

        this.overlay = this.game.add.sprite(this.game.camera.x, this.game.camera.y, 'purplepixel');
        
        this.energy1_icon = this.overlay.addChild(this.game.make.sprite(13, 28, 'energy'));
        this.energy1_icon.anchor.setTo(0.5);
        this.energy1_icon.frame = 0;

        
        this.energy2_icon = this.overlay.addChild(this.game.make.sprite(25, 28, 'energy'));
        this.energy2_icon.anchor.setTo(0.5);
        this.energy2_icon.frame = 0;

        this.energy3_icon = this.overlay.addChild(this.game.make.sprite(37, 28, 'energy'));
        this.energy3_icon.anchor.setTo(0.5);
        this.energy3_icon.frame = 0;

        this.energy4_icon = this.overlay.addChild(this.game.make.sprite(49, 28, 'energy'));
        this.energy4_icon.anchor.setTo(0.5);
        this.energy4_icon.frame = 0;

        this.energy5_icon = this.overlay.addChild(this.game.make.sprite(61, 28, 'energy'));
        this.energy5_icon.anchor.setTo(0.5);
        this.energy5_icon.frame = 0;


        this.overlay.addChild(this.game.make.text(7, 4, 'Energy', { fontSize: '12px', fill: '#76428a' }));
        

        this.overlay.addChild(this.game.make.text(80, 4, 'Gun', { fontSize: '12px', fill: '#76428a' }));


        this.icon_gun = this.overlay.addChild(this.game.make.sprite(125, 20, 'items'));
        this.icon_gun.anchor.setTo(0.5);
        this.icon_gun.frame = 9;

        this.overlay.addChild(this.game.make.text(120, 33, 'Z', { fontSize: '12px', fill: '#76428a' }));

        this.overlay.addChild(this.game.make.text(150, 4, 'Items', { fontSize: '12px', fill: '#76428a' }));

        this.icon_boot = this.overlay.addChild(this.game.make.sprite(200, 20, 'items'));
        this.icon_boot.anchor.setTo(0.5);
        this.icon_boot.frame = 4;

        this.icon_item1 = this.overlay.addChild(this.game.make.sprite(232, 20, 'items'));
        this.icon_item1.anchor.setTo(0.5);
        this.icon_item1.frame = 4;

        this.icon_item2 = this.overlay.addChild(this.game.make.sprite(264, 20, 'items'));
        this.icon_item2.anchor.setTo(0.5);
        this.icon_item2.frame = 4;

        this.icon_item3 = this.overlay.addChild(this.game.make.sprite(296, 20, 'items'));
        this.icon_item3.anchor.setTo(0.5);
        this.icon_item3.frame = 4;

        this.icon_item4 = this.overlay.addChild(this.game.make.sprite(328, 20, 'items'));
        this.icon_item4.anchor.setTo(0.5);
        this.icon_item4.frame = 4;

        this.tick = 0;
/*
        this.icon_rocket = this.game.add.sprite(this.game.camera.x + 232, this.game.camera.y + 20, 'items');
        this.icon_rocket.anchor.setTo(0.5);
        this.icon_rocket.frame = 4;

        this.icon_rockets = this.game.add.sprite(this.game.camera.x + 284, this.game.camera.y + 20, 'items');
        this.icon_rockets.anchor.setTo(0.5);
        this.icon_rockets.frame = 4;
*/
    },

    playRandomBass: function() {
        var newBass = this.game.rnd.integerInRange(0,6);
        while(newBass === this.currentBass) {
            newBass = this.game.rnd.integerInRange(0,6);
        }

        this.currentBass = newBass;
        this.music_bass[this.currentBass].play();

        this.music_bass[this.currentBass].onStop.add(function(sound) {
            this.playRandomBass();
        }, this);
    },

    playRandomMood: function() {
        var newMood = this.game.rnd.integerInRange(0,7);
        while(newMood === this.currentMood) {
            newMood = this.game.rnd.integerInRange(0,7);
        }

        this.currentMood = newMood;
        this.music_mood[this.currentMood].play();
        this.music_mood[this.currentMood].onStop.add(function(sound) {
            this.playRandomMood();
        }, this);

    },
    playRandomTrack: function() {
        var newTrack = this.game.rnd.integerInRange(0,2);
        while(newTrack === this.currentTrack) {
            newTrack = this.game.rnd.integerInRange(0,2);
        }

        this.currentTrack = newTrack;
        this.music_track[this.currentTrack].play();
    },

    gunfired: function(key) {
        //fire it here//also you can attach a .name on gunfire and switch(key.name) for each type of gun.},
        if (key == this.key_Z) {
            if(!this.dead) {
                this.laserGun.animations.play("shoot");
                this.sfx_laser.play();
                if (this.player.direction == 1) {
                    this.laserArray[this.currentLaser].x = this.player.x + 20;
                }
                else {
                    this.laserArray[this.currentLaser].x = this.player.x - 20;
                }
                
                this.laserArray[this.currentLaser].y = this.player.y - 13;
                if (this.player.crouched) {
                    this.laserArray[this.currentLaser].y += 5;
                }
                if (this.player.actuallyCrouched) {
                    this.laserArray[this.currentLaser].y += 12;
                }
                this.laserArray[this.currentLaser].direction = this.player.direction;
                
                this.laserArray[this.currentLaser].body.velocity.x = 500 * this.player.direction;
                this.laserArray[this.currentLaser].available = false;

                for (var i=0; i<30; i++) {
                    if (this.laserArray[i].available) {
                        this.currentLaser = i;
                        break;
                    }
                }
            }
        }

        
        else if (key == this.key_Q) {
            /*
            this.player.boots = this.noBoots;
            0.0.log("swapped to noboots");
            this.icon_boot.frame = 0;
            */
        }
        else if (key == this.key_X) {
            if (this.dead) {
                this.state.start('Game');
            }
            /*
            this.player.boots = this.normalBoots;
            console.log("swapped to normalboots");
            this.icon_boot.frame = 1;
            */
        }
        else if (key == this.key_C) {
            /*
            this.player.boots = this.springBoots;
            console.log("swapped to springboots");
            this.icon_boot.frame = 2;
            */
        }
        else if (key == this.key_V) {
            /*
            this.player.boots = this.rocketBoots;
            console.log("swapped to rocketboots");
            this.icon_boot.frame = 3;
            */
        }
    },


    update: function() {
            
        this.tick++;

        if (this.countdownOn && this.game.time.now - this.countdown > 5000) {
            this.ending();
        }
        if (this.player.crouched) {
            this.laserGun.y = -5;
        }
        else {
            this.laserGun.y = -10;
        }
        if (this.player.actuallyCrouched) {
            this.laserGun.y = 7;
        }

        if (this.rocketBootsCooldown > 0) {
            this.rocketBootsCooldown -= 1;
        }

        if (this.player.damageCooldown == 1) {
            this.player.tint = "0xffffff";
            this.player.damageCooldown = 0;
        }
        else if (this.player.damageCooldown > 0) {
            if (this.tick % 15 == 0) {
                if (this.player.tint == "0x660000") {
                    this.player.tint = "0x990000";
                }
                else {
                    this.player.tint = "0x660000";
                }
            }

            this.player.damageCooldown -= 1;
        }

        this.timer++;
        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(this.player, this.blockedLayer);

        this.game.physics.arcade.collide(this.creatures, this.blockedLayer, this.creatureOnBlocked, null, this);

        this.game.physics.arcade.overlap(this.lasers, this.creatures, this.laserOnCreature, null, this);

        this.game.physics.arcade.overlap(this.creatures, this.player, this.creatureOnPlayer, null, this);

        this.game.physics.arcade.collide(this.lasers, this.blockedLayer, this.destroyLaserbeam, null, this);

        this.game.physics.arcade.overlap(this.creatures, this.creatures, this.creatureOnCreature, null, this);

        this.game.physics.arcade.overlap(this.player, this.findableItems, this.foundItem, null, this);
        

        this.creatures.forEach(function(creature) {
            if (creature.stillAlive) {
                if (creature.state == "attack") {
                    if (this.player.x + 32 < creature.x) {
                        creature.direction = -1;
                        creature.scale.setTo(-1,1);
                        if (creature.monsterType == "watcher") {
                            creature.scale.setTo(1,1);
                        }
                        creature.body.velocity.x = -1 * creature.attackSpeed;
                    }
                    else if (this.player.x - 32 > creature.x) {
                        creature.direction = 1;
                        creature.scale.setTo(1,1);
                        if (creature.monsterType == "watcher") {
                            creature.scale.setTo(-1,1);
                        }
                        creature.body.velocity.x = creature.attackSpeed;
                    }

                    if (creature.body.blocked.down && ((this.player.y < creature.y && this.game.rnd.integerInRange(0,50) == 0) || this.game.rnd.integerInRange(0, 600) == 0)) {

                        creature.body.velocity.y = -1 * creature.attackJump;
                    }


                }

                if (creature.monsterType == "blob") {
                    if (creature.state == "hanging" && Math.abs(this.player.y - creature.y) < 300 && this.player.y > creature.y && Math.abs(this.player.x - creature.x) < 50 && this.game.rnd.integerInRange(0, 200) == 0) {
                        creature.animations.play("jump_attack");
                        creature.state = "jump_attack";
                        creature.body.gravity.y = 400;
                    }
                }
                else if (creature.monsterType == "watcher") {

                    var maxRange = Math.floor(Math.abs(this.player.x - creature.x)/2);
                    if (creature.state == "waiting" && (creature.y - this.player.y) < 80 && Math.abs(this.player.x - creature.x) < 450 && this.game.rnd.integerInRange(0, 1.3*maxRange) == 0) {
                        creature.frame = 5;
                        creature.state = "watching";
                    }
                    else if (creature.state == "watching" && Math.abs(this.player.x - creature.x) < 350 && this.game.rnd.integerInRange(0, maxRange) == 0) {
                        creature.animations.play("attack");
                        if (creature.triggerMusic == "yes") {
                            this.playRandomTrack();
                        }
                        this.sfx_roar.play();
                        this.sfx_grunt.loopFull(0.4);

                        creature.state = "attack";
                        creature.body.velocity.y = -1 * creature.attackJump;
                    }
                }
                else if (creature.monsterType == "bat") {
                    if (this.game.rnd.integerInRange(0, 20) == 0) {
                        creature.body.velocity.y -= creature.attackJump;
                    }
                    if (creature.state == "flying" && Math.abs(this.player.y - creature.y) < 200 && Math.abs(this.player.x - creature.x) < 400) {
                        creature.animations.play("attack");
                        creature.state = "attack";
                    }
                    if (creature.state == "attack" && this.game.rnd.integerInRange(0, 30) == 0) {
                        if (Math.abs(this.player.x - creature.x) < 350 && Math.abs(this.player.y - creature.y) < 160 && this.game.rnd.integerInRange(0, 2) == 0) {
                            if(!this.dead) {
                                this.sfx_bat.play();
                            }
                        }
                        if (this.player.y > creature.y) {
                            creature.body.velocity.y = creature.attackSpeed;
                        }
                        else {
                            creature.body.velocity.y = -1 * creature.attackSpeed;
                        }
                    }
                }

            }
            else {
                if (Math.abs(creature.body.velocity.x) > 3) {
                    creature.body.velocity.x = creature.body.velocity.x/1.05;
                }
                else {
                    creature.body.velocity.x = 0;
                }

            }
        }, this);


        if (this.player.y > this.game.camera.y + (19*16) + 56) {
            this.camera.y += (19*16);
            this.purpleOverlay.y += (19*16);
            this.blackOverlay.y += (19*16);
            this.overlay.y += (19*16);
        }
        else if (this.player.y < this.game.camera.y + 56 && this.player.y > 100) {
            this.camera.y -= (19*16);
            this.purpleOverlay.y -= (19*16);
            this.blackOverlay.y -= (19*16);
            this.overlay.y -= (19*16);
        }
        if (this.player.x > this.game.camera.x + (30*16)) {
            this.camera.x += (30*16);
            this.purpleOverlay.x += (30*16);
            this.blackOverlay.x += (30*16);
            this.overlay.x += (30*16);
        }
        else if (this.player.x < this.game.camera.x) {
            this.camera.x -= (30*16);
            this.purpleOverlay.x -= (30*16);
            this.blackOverlay.x -= (30*16);
            this.overlay.x -= (30*16);
        }
        this.player.body.velocity.x = 0;

        if (this.dead) return;

        if (this.cursors.left.isDown)
        {
            //  Move to the left
            this.player.scale.setTo(-1, 1);
            //this.laserGun.scale.setTo(-1, 1);
            this.player.body.velocity.x = -200;
            this.player.direction = -1;

            this.player.animations.play('left');
            this.player.actuallyCrouched = false;
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.player.scale.setTo(1, 1);
            //this.laserGun.scale.setTo(1, 1);
            this.player.body.velocity.x = 200;
            this.player.direction = 1;

            this.player.animations.play('right');
            this.player.actuallyCrouched = false;
        }
        else
        {
            //  Stand still
            if (!this.player.actuallyCrouched) {
               this.player.animations.play('idle');
            }

            
        }
        
        if (this.deadWatchers > 4 && this.player.y < 350) {
            this.fadeToEnding(true);
        }

        if (this.player.y > this.game.world.height) {
            this.death();
        }

    },

    crouch: function(key) {
        if(!this.dead) {
            this.player.crouched = true;
            if (this.player.body.velocity.x == 0) {
                if(!this.player.actuallyCrouched) {
                    this.player.actuallyCrouched = true;
                    this.player.animations.play("crouch");
                }
            }
            else {
                this.player.actuallyCrouched = false;
            }
        }
    },
    notCrouch: function(key) {
        if(!this.dead) {
            this.player.crouched = false;
            this.player.actuallyCrouched = false;
        }
    },
    jump: function(key) {

        if(!this.dead) {
            this.player.actuallyCrouched = false;
            if (!this.player.body.blocked.down) {
                if(this.player.boots == this.rocketBoots && this.rocketBootsCooldown < 1) {
                    this.player.body.velocity.y = this.player.boots;
                    this.rocketBootsCooldown = 100;
                }
            }
            else if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.body.velocity.y = this.player.boots;
                this.rocketBootsCooldown = 0;
            }
        }

    },

    redrawEnergyBars: function() {


        if (this.player.life > 1) {
            this.energy1_icon.frame = 0;

            if (this.player.life > 3) {
                this.energy2_icon.frame = 0;

                if (this.player.life > 5) {
                    this.energy3_icon.frame = 0;

                    if (this.player.life > 7) {
                        this.energy4_icon.frame = 0;

                        if (this.player.life > 9) {
                            this.energy5_icon.frame = 0;
                        }
                        else if (this.player.life == 9) {
                            this.energy5_icon.frame = 3;
                        }
                        else {
                            this.energy5_icon.frame = 1;
                        }

                    }
                    else if (this.player.life == 7) {
                        this.energy4_icon.frame = 2;
                    }
                    else {
                        this.energy4_icon.frame = 1;
                    }

                }
                else if (this.player.life == 5) {
                    this.energy3_icon.frame = 4;
                }
                else {
                    this.energy3_icon.frame = 1;
                }

            }
            else if (this.player.life == 3) {
                this.energy2_icon.frame = 2;
            }
            else {
                this.energy2_icon.frame = 1;
            }

        }
        else if (this.player.life == 1) {
            this.energy1_icon.frame = 2;
        }
        else {
            this.energy1_icon.frame = 1;
        }

    },

    death: function() {


        this.game.add.text(this.game.camera.x+80, this.game.camera.y+150, 'Oh no! You have died!', { fontSize: '32px', fill: '#76428a' });
        this.game.add.text(this.game.camera.x+155, this.game.camera.y+200, 'Press X to restart', { fontSize: '22px', fill: '#76428a' });
        this.player.animations.stop();
        this.player.frame = 12;
        //this.player.anchor.setTo(0.5, 1);
        this.player.scale.setTo(1);
        this.player.body.setSize(64,64,0,-16);
        this.player.angle = 270;
        this.laserGun.destroy();
        this.player.y += 0;
        this.dead = true;
    },


    ending: function() {

        this.music_bass[this.currentBass].onStop.dispose();//destroy();
        this.music_bass[this.currentBass].fadeOut();//destroy();
        this.music_mood[this.currentMood].onStop.dispose();//destroy();
        this.music_mood[this.currentMood].fadeOut();//destroy();
        this.music_track[this.currentTrack].fadeOut();//destroy();

        //this.music_bass[this.currentBass].fadeOut();
        //this.music_mood[this.currentMood].fadeOut();
        //this.music_track[this.currentTrack].fadeOut();
        this.state.start('Ending', true, false, this.player.rocketBoots, this.player.armour, this.player.themask, this.player.springBoots);
  
    },

    creatureOnBlocked: function(creature, block) {

        if (!creature.stillAlive && !creature.splat && creature.state == "falling") {
            creature.animations.play("deathSplat");
            creature.splat = true;
        }
        else if (creature.state == "jump_attack" && creature.stillAlive) {
            creature.animations.play("land");
            creature.state = "attack";

            creature.events.onAnimationComplete.add(function(creature) {
                creature.animations.play("attack");

            }, this);

        }
        else {
            var speed = creature.baseSpeed;
            if (creature.state == "attack") {
                speed = creature.attackSpeed;
            }
            if (creature.body.blocked.right && creature.direction == 1) {
                creature.body.velocity.x = -1 * speed;
                creature.direction = creature.direction * -1;
                creature.scale.setTo(creature.direction,1);
            }
            else if(creature.body.blocked.left && creature.direction == -1) {
                creature.body.velocity.x = speed;
                creature.direction = creature.direction * -1;
                creature.scale.setTo(creature.direction,1);
            }
            
        }
    },


    creatureOnPlayer: function(player, creature) {
        if (creature.stillAlive && !this.dead) {
            if (this.player.damageCooldown > 0) {
                this.player.damageCooldown -= 1;
            }
            else {
                if (this.player.armour) {
                    this.player.life -= 1;
                }
                else {
                    this.player.life -= 2;
                }
                this.redrawEnergyBars();
                this.player.tint = "0xbb0000";
                this.player.damageCooldown = this.damageCooldownSetting;
                if (this.game.rnd.integerInRange(0,1) == 0) {
                    this.sfx_ouch1.play();
                }
                else {
                    this.sfx_ouch2.play();
                }
            }

            if (this.player.life == 0) {
                creature.animations.play("playerDeath");
                creature.body.velocity.x = 0;
                creature.state = "idle";
                if (creature.monsterType == "watcher") {
                   this.sfx_grunt.stop();
                }
                this.death();
            }
        }

    },

    killCreature: function(creature) {
        creature.events.destroy();
        creature.animations.stop();
        if (creature.state == "hanging") {
            creature.animations.play("deathFall");
            creature.state = "falling";
        }
        else {
            creature.animations.play("death");
        }
        creature.body.gravity.y = 400;
        //creature.body.velocity.y = 0;
        creature.body.velocity.x = creature.body.velocity.x/2;
        
        creature.stillAlive = false;
        
        if (creature.monsterType == "watcher") {
            this.sfx_roar.stop();
            this.sfx_grunt.stop();
            this.deadWatchers += 1;
        }


    },

    creatureOnCreature: function(creature1, creature2) {
        if (creature1.stillAlive && creature2.stillAlive && creature1 != creature2 && creature1.monsterType != creature2.monsterType) {
            if (creature1.monsterType == "watcher") {
                this.killCreature(creature2);
            }
            else if(creature2.monsterType == "watcher") {
                this.killCreature(creature1);
            }
        }

    },


    laserOnCreature: function(laserbeam, creature) {
        if (creature.stillAlive) {
            this.killCreature(creature);
            this.sfx_hit.play();
            var laserplosion = this.game.add.sprite(laserbeam.x + (25*laserbeam.direction), laserbeam.y, 'laserplosion');
            laserplosion.anchor.setTo(0.5);
            laserplosion.animations.add("plose", [0,1,2,3,4,5], 10, false);
            laserplosion.animations.play("plose");

            for(var i=0; i<30; i++) {
                if(this.laserArray[i] == laserbeam) {
                    this.laserArray[i].body.velocity.x = 0;
                    this.laserArray[i].x = 0;
                    this.laserArray[i].y = -100;
                    this.laserArray[i].available = true;
                    return;
                }
            }
        }
    },

    destroyLaserbeam: function(laserbeam, object) {
        for(var i=0; i<30; i++) {
            if(this.laserArray[i] == laserbeam) {
                this.laserArray[i].body.velocity.x = 0;
                this.laserArray[i].x = 0;
                this.laserArray[i].y = -100;
                this.laserArray[i].available = true;
                return;
            }
        }
    },

    foundItem: function(player, item) {
        
        if (item.itemType == "springBoots" && this.player.boots != this.rocketBoots) {
            this.player.boots = this.springBoots;
            this.icon_boot.frame = 2;
            this.player.springBoots = true;
        }
        else if (item.itemType == "rocketBoots") {
            this.player.boots = this.rocketBoots;
            this.icon_boot.frame = 3;
            this.music_leitmotif.play();
            this.player.rocketBoots = true;
        }
        else if (item.itemType == "armour") {
            this.player.armour = true;
            this.icon_item1.frame = 13;
            this.music_leitmotif.play();
        }
        else if (item.itemType == "mask") {
            this.player.themask = true;
            this.icon_item2.frame = 12;
            this.music_leitmotif.play();

            this.fadeToEnding(false);
        }
        else if (item.itemType == "melody2") {
            
            this.music_melody2.play();

        }
        else if (item.itemType == "melody") {
            if(this.game.rnd.integerInRange(0,2) == 0) {
                this.music_melody1.play();
            }
            else {
                this.music_leitmotif.play();
            }

        }
        item.destroy();

    },

    fadeToEnding: function(win) {


        if (!win) {
            var darkness2 = this.game.add.sprite(this.player.x, this.player.y-90, "darkness");
            darkness2.alpha = 0;
            darkness2.anchor.setTo(0.5);

            var tween = this.game.add.tween(darkness2).to( { alpha: 1 }, 3500);
            tween.start();
            this.game.world.bringToTop(this.player);
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 1;

            this.dead = true;
        }

        var darkness = this.game.add.sprite(0, 0, "blackpixel");
        darkness.alpha = 0;
        darkness.scale.setTo(this.game.width*6, this.game.height*6);

        var tween = this.game.add.tween(darkness).to( { alpha: 1 }, 5000);
        tween.start();


        this.countdown = this.game.time.now;
        this.countdownOn = true;

    },


    // find objects in a tiled layer that contains a property called "type" equal to a value
    findObjectsByType: function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                // phaser uses top left - tiled bottom left so need to adjust:
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },

    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, 'objects');
        sprite.frame = parseInt(element.properties.frame);

        // copy all of the sprite's properties
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
    },


    render: function() {

        if (this.showDebug) {
            this.game.debug.body(this.star);
            this.game.debug.body(this.player);
        }
    },

};