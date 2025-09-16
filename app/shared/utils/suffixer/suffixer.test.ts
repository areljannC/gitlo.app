import { describe, it, expect } from 'vitest';
import { suffixer } from './suffixer';

describe('suffixer', () => {
	it('returns a function that suffixes keys', () => {
		const sf = suffixer('.foo');
		expect(sf('bar')).toBe('bar.foo');
		expect(sf('baz')).toBe('baz.foo');
	});

	it('works with empty suffix', () => {
		const sf = suffixer('');
		expect(sf('bar')).toBe('bar');
	});

	it('works with empty key', () => {
		const sf = suffixer('.foo');
		expect(sf('')).toBe('.foo');
	});

	it('works with both empty', () => {
		const sf = suffixer('');
		expect(sf('')).toBe('');
	});
});
