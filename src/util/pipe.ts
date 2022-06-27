export default (...fns: any) =>
	(x: any) =>
		fns.reduce((y: any, f: any) => f(y), x);
