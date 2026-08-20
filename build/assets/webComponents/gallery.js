class Gallery extends HTMLElement {
	constructor() {
		super();
		const NShadow = this.attachShadow({mode: 'open'});

		NShadow.innerHTML = `
		<div class="content">
		    <slot name="images"></slot>
		</div>
		<nav>
		    <slot name="navigation"></slot>
		</nav>`;
	}

	connectedCallback() {
		this.NNavigation = this.querySelector(`[data-part="navigation"]`);

		if (this.getAttribute('mode') === 'slideshow') {
			this.setupSlideshow();
		}
	}

	setupSlideshow() {
		this.currentIndex = 0;
		this.NButtonPrev = this.querySelector(`button._prev`);
		this.NButtonNext = this.querySelector(`button._next`);
		this.NButtonPrev?.addEventListener('click', () => this.prev());
		this.NButtonNext?.addEventListener('click', () => this.next());
		this.NImages = [...this.querySelectorAll(`[slot="images"] > *`)];
		this.NImages.forEach((N, i) => (N.dataset.index = i));
		this.imageCount = this.NImages.length;
		this.NCurrent = null;

		// Status display:
		this.statusDisplay = {
			NCurrent: this.querySelector('[data-insert="currentIndex"]'),
			NImageCount: this.querySelector('[data-insert="imageCount"]'),
		};

		this.statusDisplay.NImageCount.innerHTML = this.imageCount;

		// Show image #1:
		this.updateCurrentImage(0);
	}

	set currentIndex(n) {
		this.setAttribute('current', n);
	}

	get currentIndex() {
		return parseInt(this.getAttribute('current'));
	}

	prev() {
		const prevIndex = this.calcIndex(-1);
		this.currentIndex = prevIndex;
		this.updateCurrentImage(prevIndex);
	}

	next() {
		const nextIndex = this.calcIndex(+1);
		this.currentIndex = nextIndex;
		this.updateCurrentImage(nextIndex);
	}

	updateCurrentImage(index = this.currentIndex) {
		if (this.NCurrent) this.NCurrent.dataset.isCurrent = false;
		this.NCurrent = this.NImages[index];
		this.NCurrent.dataset.isCurrent = true;
		this.updateDisplay();
	}

	updateDisplay() {
		this.statusDisplay.NCurrent.innerHTML = this.currentIndex + 1;
	}

	calcIndex(step = 0) {
		const index = (this.currentIndex + step) % this.imageCount;
		return index < 0 ? this.imageCount + index : index;
	}
}

customElements.define('c-gallery', Gallery);
