import { step } from 'mocha-steps'
import Page from '../builder'
describe('Config test', () => {
	let page
	before(async () => {
		page = await Page.build('Desktop')
	})
	after(async () => {
		await page.close()
	})
	it('should work', function () {
		console.log('Working')
	})
	step('should load google homepage', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitAndClick('#onlineBankingMenu')
		await page.waitFor(5000)
	})
})
