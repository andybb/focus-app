angular.module('focus.controllers')
  .controller('PlayerController', function($scope, AudioLibrary, $cordovaMedia) {
  	var media;

    $scope.isPlaying = false;
    $scope.sounds = AudioLibrary.getAllSounds();
    $scope.sound = AudioLibrary.getSound();
    $scope.currentTrack = $scope.sound.trackNumber - 1;

    // Make sure player is updated whenever a new sound is chosen
    $scope.$watch(function() { return AudioLibrary.sound }, function(newVal, oldVal) {
    if (typeof newVal !== 'undefined') {
        $scope.sound = AudioLibrary.sound;
        $scope.new($scope.sound);
      }
    });

    $scope.new = function(sound) {
      if (media) {
        media.release();
      }
      var src = (ionic.Platform.isAndroid() ? "/android_asset/www/" + sound.src : sound.src);

      media = $cordovaMedia.newMedia(src);
      media.play();

      $scope.isPlaying = true;
      $scope.currentTrack = sound.trackNumber - 1;
    }

    $scope.playOrPause = function() {
      if(media && $scope.isPlaying) {
        $scope.isPlaying = false;
        media.pause();
      }
      else if (media && !$scope.isPlaying) {
        $scope.isPlaying = true;
        media.play();
      }
    }

    $scope.next = function() {
      if ($scope.currentTrack == $scope.sounds.length - 1) {
        $scope.sound = $scope.sounds[0];
        $scope.new($scope.sounds[0]);
      }
      else {
        $scope.sound = $scope.sounds[$scope.currentTrack + 1];
        $scope.new($scope.sounds[$scope.currentTrack + 1]);
       
      }
    }

    $scope.prev = function() {
      if ($scope.currentTrack == 0) {
        $scope.sound = $scope.sounds[$scope.sounds.length - 1];
        $scope.new($scope.sounds[$scope.sounds.length - 1]);
      }
      else {
        $scope.sound = $scope.sounds[$scope.currentTrack - 1];
        $scope.new($scope.sounds[$scope.currentTrack - 1]);
      }
    }
  });