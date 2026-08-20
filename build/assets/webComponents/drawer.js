class Drawer extends HTMLElement {
	constructor() {
		super();

		this.setAttribute('id', 'd-' + crypto.randomUUID().split('-')[0]);
		this.NDetails = this.querySelector('details');
		this.NContent = this.querySelector('details .content');
		this.NSummary = this.querySelector('details summary');
	}

	// Attributes

	static get observedAttributes() {
		return ['is-open'];
	}

	get isOpen() {
		const _isOpen = this.getAttribute('is-open');
		return typeof _isOpen === 'string' ? _isOpen === 'true' : _isOpen;
	}

	set isOpen(value) {
		if (typeof value !== 'boolean') throw 'Value must be of type boolean.';
		this.setAttribute('is-open', value);
	}

	get heightExpanded() {
		return (
			this.NSummary.offsetHeight +
			this.NContent.offsetHeight +
			(this.NDetails.offsetHeight - this.NDetails.clientHeight)
		);
	}

	get heightCollapsed() {
		return (
			this.NSummary.offsetHeight + (this.NDetails.offsetHeight - this.NDetails.clientHeight)
		);
	}

	// Callbacks

	connectedCallback() {
		if (!this.NDetails || !this.NSummary || !this.NContent)
			throw "Drawer must contain <details>, <summary> and <div class='content'>";
		this.isOpen = typeof this.isOpen === 'boolean' ? this.isOpen : false;
		this.NDetails.style.setProperty('overflow', 'hidden');
		this.NSummary.addEventListener('click', (e) => this.onclick(e));

		this.observeResize();
		setTimeout(() => {
			this.NDetails.style.setProperty('height', this.isOpen ? this.heightExpanded : 'auto');
		}, 100);
	}

	disconnectedCallback() {
		if (this.unobserveResize) this.unobserveResize();
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		if (oldVal === null) return;
		switch (attrName) {
			case 'is-open':
				if (newVal === 'true') this.open();
				else this.close();
				break;
		}
	}

	// Functions

	observeResize() {
		window.addEventListener('resize', () => this.handleResize(), {once: true});
	}

	handleResize() {
		const timeoutId = setTimeout(() => {
			this.observeResize();
			if (!this.isOpen) return;
			this.NDetails.style.setProperty('height', this.heightExpanded + 'px');
		}, 1000);

		this.unobserveResize = () => {
			clearTimeout(timeoutId);
			window.removeEventListener('resize', () => this.handleResize());
		};
	}

	onclick(e) {
		e.preventDefault();
		this.isOpen = !this.isOpen;
	}

	open() {
		this.NDetails.setAttribute('open', true);
		// Content height is 0px in FF and Safari if <details open="false">
		requestAnimationFrame(() => {
			this.expand();
		});
	}

	async close() {
		await this.collapse();
		this.NDetails.removeAttribute('open');
	}

	collapse() {
		return new Promise((resolve) => {
			let transitionStarted = false;

			const handleTransitionStart = (e) => {
				transitionStarted = e.propertyName === 'height';
			};

			const handleTransitionEnd = () => {
				finish();
			};

			const finish = () => {
				this.NDetails.style.setProperty('height', 'auto');
				this.NDetails.removeEventListener('transitionstart', handleTransitionStart);
				this.NDetails.removeEventListener('transitionend', handleTransitionEnd);
				resolve(true);
			};

			this.NDetails.addEventListener('transitionstart', handleTransitionStart, {once: true});

			requestAnimationFrame(() => {
				this.NDetails.style.setProperty('height', this.heightCollapsed + 'px');
				requestAnimationFrame(() => {
					if (!transitionStarted) finish();
					else {
						this.NDetails.addEventListener('transitionend', handleTransitionEnd, {
							once: true,
						});
					}
				});
			});
		});
	}

	expand() {
		this.NDetails.style.setProperty('height', this.heightCollapsed + 'px');
		requestAnimationFrame(() => {
			this.NDetails.style.setProperty('height', this.heightExpanded + 'px');
		});
	}
}

customElements.define('c-drawer', Drawer);
