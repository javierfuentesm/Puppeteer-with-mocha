'use strict';

var _mochaSteps = require('mocha-steps');

var _chai = require('chai');

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
	(0, _mochaSteps.step)('should load page', async function () {
		await page.goto('http://zero.webappsecurity.com/index.html');
		var signinButton = await page.isElementVisible('#signin_button');
		console.log(signinButton);
		(0, _chai.expect)(signinButton).to.be.true;
	});
	(0, _mochaSteps.step)('should display login form ', async function () {
		await page.waitAndClick('#signin_button');
		var signinButton = await page.isElementVisible('#signin_button');
		(0, _chai.expect)(signinButton).to.be.false;
	});
	(0, _mochaSteps.step)('should  login to application ', async function () {
		await page.waitAndType('#user_login', 'username');
		await page.waitAndType('#user_password', 'password');
		await page.waitAndClick('.btn-primary');
	});
	(0, _mochaSteps.step)('should see other page ', async function () {
		await page.waitForTex('body', 'Cash');
		await page.waitFor(5000);
	});
});