import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CloudService } from '../../services/cloud.service';
import { StreamState } from '../../interfaces/stream-state';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};

  isFirstPlaying() {
    return this.currentFile.index == 0;
  }
  isLastPlaying() {
    return this.currentFile.index == this.files.length - 1;
  }

  constructor(
    public audioService: AudioService,
    public cloudService: CloudService
  ) {
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {

    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  stop() {
    this.audioService.stop();
  }

  resume() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value)
  }
}