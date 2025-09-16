import * as v from 'valibot';
import { prefixer } from '~/shared/utils';
import type { Composer } from 'vue-i18n';

const pf = prefixer('schemas.board.');

export const getIdValidator = (t: Composer['t']) => v.pipe(v.string(), v.trim(), v.nonEmpty(t(pf('id.nonEmpty'))));
export const getNameValidator = (t: Composer['t']) => v.pipe(v.string(), v.trim(), v.nonEmpty(t(pf('name.nonEmpty'))), v.minLength(4, t(pf('name.minLength'))), v.maxLength(32, t(pf('name.maxLength'))));
export const getDescriptionValidator = (t: Composer['t']) => v.optional(v.pipe(v.string(), v.trim(), v.maxLength(128, t(pf('description.maxLength')))));
export const getTagValidator = (t: Composer['t']) => v.optional(v.pipe(v.string(), v.trim(), v.minLength(2, t(pf('tag.minLength'))), v.maxLength(16, t(pf('tag.maxLength')))));
export const getTagsValidator = (t: Composer['t']) => v.optional(v.array(v.pipe(v.string(), v.trim(), v.minLength(2, t(pf('tag.minLength'))), v.maxLength(16, t(pf('tag.maxLength'))))));
export const getColumnsValidator = (t: Composer['t']) => v.pipe(v.number(), v.minValue(1, t(pf('columns.minCount'))), v.maxValue(16, t(pf('columns.maxCount'))));
export const getColumnIdsValidator = (t: Composer['t']) => v.pipe(v.array(v.string()), v.minLength(1, t(pf('columns.minCount'))), v.maxLength(16, t(pf('columns.maxCount'))));
