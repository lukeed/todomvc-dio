import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

export default {
	dest: 'dist/bundle.js',
	entry: 'src/index.js',
	format: 'iife',
	plugins: [
		buble(),
		replace({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		resolve({
			browser: true,
			main: true
		})
	],
	sourceMap: true
};
