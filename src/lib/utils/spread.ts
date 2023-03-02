export const spread = (node, attrs) => {
	const attrKeys = Object.keys(attrs);

	const addEvt = (e, f) => node.addEventListener(e, f);
	const remEvt = (e, f) => node.removeEventListener(e, f);

	const onEvents = (attr) => attr.startsWith('on:');
	const others = (attr) => !attr.startsWith('on:');

	const setup = (attr) => addEvt(attr.substr(3), attrs[attr]);
	const teardown = (attr) => remEvt(attr.substr(3), attrs[attr]);

	const apply = (attrName) => {
		node.setAttribute(attrName, attrs[attrName]);
	};

	attrKeys.filter(onEvents).map(setup);
	attrKeys.filter(others).forEach(apply);

	return {
		update(attrs) {
			const attrKeys = Object.keys(attrs);
			attrKeys.filter(onEvents).map(teardown);
			attrKeys.filter(onEvents).map(setup);
			attrKeys.filter(others).map(apply);
		},
		destroy() {
			attrKeys.filter(onEvents).map(teardown);
		}
	};
};
