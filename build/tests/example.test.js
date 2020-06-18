'use strict';

var _mochaSteps = require('mocha-steps');

var _builder = require('../builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Config test', function () {
	var page = void 0;
	before(async function () {
		page = await _builder2.default.build('Desktop');
	});
	after(async function () {
		await page.close();
	});
	it('should work', function () {
		console.log('Working');
	});
	(0, _mochaSteps.step)('should load google homepage', async function () {
		await page.goto('https://google.com');
	});
	(0, _mochaSteps.step)('step 2 should fail', async function () {
		throw new Error();
	});
	(0, _mochaSteps.step)('step 3', async function () {
		console.log('step 3');
	});
});