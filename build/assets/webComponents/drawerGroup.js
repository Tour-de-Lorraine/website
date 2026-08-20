class DrawerGroup extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const NDrawers = [...this.children].filter((N) => N.tagName.includes('DRAWER'));

		this.observer = new MutationObserver((mutations) => {
			const opened = mutations.find(({target}) =>
				['true', true].includes(target.getAttribute('is-open')),
			);

			if (!opened) return;

			NDrawers.forEach((NDrawer) => {
				if (NDrawer.isOpen && NDrawer.isEqualNode(opened.target) === false) {
					NDrawer.isOpen = false;
				}
			});
		});

		NDrawers.forEach((NDrawer) =>
			this.observer.observe(NDrawer, {
				attributeFilter: ['is-open'],
				attributeOldValue: true,
			}),
		);
	}
}

customElements.define('c-drawer-group', DrawerGroup);
