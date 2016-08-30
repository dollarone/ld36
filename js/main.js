var PlatformerGame = PlatformerGame || {};

PlatformerGame.game = new Phaser.Game(480, 360, Phaser.AUTO, '', null, false, false);
//, '', { preload: preload, create: cr4ate, update: update });

PlatformerGame.game.state.add('Boot', PlatformerGame.Boot);
PlatformerGame.game.state.add('Preload', PlatformerGame.Preload);
PlatformerGame.game.state.add('Logo', PlatformerGame.Logo);
PlatformerGame.game.state.add('Story', PlatformerGame.Story);
PlatformerGame.game.state.add('Ending', PlatformerGame.Ending);
PlatformerGame.game.state.add('Game', PlatformerGame.Game);

PlatformerGame.game.state.start('Boot');
