// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

import schemaTypes from 'all:part:@sanity/base/schema-type';

import skill from './skill';
import pageInfo from './pageInfo';
import experience from './experience';
import project from './project';
import social from './social';
import post from './post';
import author from './author';
import category from './category';
import blockContent from './blockContent';

export default createSchema({
	name: 'default',

	types: schemaTypes.concat([
		skill,
		pageInfo,
		experience,
		social,
		project,
		post,
		author,
		category,
		blockContent,
	]),
});
