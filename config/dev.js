import jsx from 'rollup-plugin-jsx';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

export default {
	dest: 'dist/bundle.js',
	entry: 'src/index.js',
	format: 'iife',
	plugins: [
		jsx({
			factory: 'h'
		}),
		buble(),
		replace({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		resolve({
			browser: true,
			main: true
		})
	],
	sourceMap: false
};
