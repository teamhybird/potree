export function ProgressBar(baseId) {
  this._progress = 0;
  this._message = '';

  this.maxOpacity = 0.9;
  try {
    this.element = document.getElementById(baseId);
    this.elProgress = document.getElementById(`${baseId}-bar`);
    this.elProgressMessage = document.getElementById(`${baseId}-text`);
  } catch (e) {
    console.warn('Cannot render progress bar, ', e);
  }

  if (!this.element || !this.elProgress || !this.elProgressMessage) {
    return null;
  }
  //this.element.innerHTML = "element";
  //this.elProgress.innerHTML = "progress";

  // this.element.innerHTML = '';
  // this.element.style.position = 'fixed';
  // this.element.style.bottom = '40px';
  // this.element.style.width = '200px';
  // this.element.style.marginLeft = '-100px';
  // this.element.style.left = '50%';
  // this.element.style.borderRadius = '5px';
  // this.element.style.border = '1px solid #727678';
  // this.element.style.height = '16px';
  // this.element.style.padding = '1px';
  // this.element.style.textAlign = 'center';
  // this.element.style.backgroundColor = '#6ba8e5';
  this.element.style.opacity = this.maxOpacity;
  // this.element.style.pointerEvents = 'none';

  // this.elProgress.innerHTML = ' ';
  // this.elProgress.style.backgroundColor = '#b8e1fc';
  // this.elProgress.style.position = 'absolute';
  // this.elProgress.style.borderRadius = '5px';
  this.elProgress.style.width = '0%';
  this.elProgress.style.height = '100%';
  this.elProgress.style.margin = '0px';
  this.elProgress.style.padding = '0px';

  // this.elProgressMessage.style.position = 'absolute';
  // this.elProgressMessage.style.width = '100%';
  this.elProgressMessage.innerHTML = 'loading 1 / 10';

  // document.body.appendChild(this.element);
  // this.element.appendChild(this.elProgress);
  // this.element.appendChild(this.elProgressMessage);

  this.hide();
}

ProgressBar.prototype.hide = function () {
  if (!this.element) return;

  this.element.style.opacity = 0;
  this.element.style.transition = 'all 0.2s ease';
};

ProgressBar.prototype.show = function () {
  if (!this.element) return;

  this.element.style.opacity = this.maxOpacity;
  this.element.style.transition = 'all 0.2s ease';
};

Object.defineProperty(ProgressBar.prototype, 'progress', {
  get: function () {
    return this._progress;
  },
  set: function (value) {
    if (!this.elProgress) return;

    if (!isNaN(value)) {
      this._progress = parseInt(value);
      this.elProgress.style.width = value * 100 + '%';
    }
  },
});

Object.defineProperty(ProgressBar.prototype, 'message', {
  get: function () {
    return this._message;
  },
  set: function (message) {
    if (!this.elProgressMessage) return;

    this._message = message;
    this.elProgressMessage.innerHTML = message;
  },
});
