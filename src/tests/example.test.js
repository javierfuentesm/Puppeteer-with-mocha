import { step } from 'mocha-steps'
import { expect } from 'chai'
import Page from '../builder'
import LoginPage from '../pages/LoginPage'
describe('Config test', () => {
	let page, loginPage
	before(async () => {
		page = await Page.build('Desktop')
		loginPage = await new LoginPage(page)
	})
	after(async () => {
		await page.close()
	})
	it('should work', function () {
		console.log('Working')
	})
	step('should load page', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html')
		const signinButton = await page.isElementVisible('#signin_button')
		console.log(signinButton)
		expect(signinButton).to.be.true
	})
	step('should display login form ', async () => {
		await page.waitAndClick('#signin_button')
		const signinButton = await page.isElementVisible('#signin_button')
		expect(signinButton).to.be.false
	})
	step('should  login to application ', async () => {
		/*	await page.waitAndType('#user_login', 'username')
		await page.waitAndType('#user_password', 'password')
		await page.waitAndClick('.btn-primary')*/
		await loginPage.login('username', 'password')
	})
	step('should see other page ', async () => {
		await page.waitForTex('body', 'Cash')
		const navBarElements = await page.getCount('.nav-tabs li')
		expect(navBarElements).to.equal(6)
		await page.waitFor(5000)
	})
})
