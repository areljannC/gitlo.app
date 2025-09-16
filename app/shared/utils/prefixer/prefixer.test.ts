import { describe, it, expect } from 'vitest';
import { prefixer } from './prefixer';

describe('prefixer', () => {
	it('returns a function that prefixes keys', () => {
		const pf = prefixer('foo.');
		expect(pf('bar')).toBe('foo.bar');
		expect(pf('baz')).toBe('foo.baz');
	});

	it('works with empty prefix', () => {
		const pf = prefixer('');
		expect(pf('bar')).toBe('bar');
	});

	it('works with empty key', () => {
		const pf = prefixer('foo.');
		expect(pf('')).toBe('foo.');
	});

	it('works with both empty', () => {
		const pf = prefixer('');
		expect(pf('')).toBe('');
	});
});
