import puppeteer from 'puppeteer'

export default class Builder {
	static async build(viewport) {
		const launchOptions = {
			headless: false,
			slowMo: 0,
			args: [
				'--no-sandbox',
				'--disable-setui-sandbox',
				'--disable-web-security',
			],
		}
		const browser = await puppeteer.launch(launchOptions)
		const page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		const extendedPage = new Builder(page)
		switch (viewport) {
			case 'Mobile':
				const mobileViewPort = puppeteer.devices['iPhone X']
				await page.emulate(mobileViewPort)
				break

			case 'Tablet':
				const tabletViewPort = puppeteer.devices['iPad landscape']
				await page.emulate(tabletViewPort)
				break
			case 'Desktop':
				await page.setViewport({ width: 800, height: 600 })
				break
			default:
				throw new Error('Supported devices are only Mobile | Tablet | Desktop')
		}

		return new Proxy(extendedPage, {
			get: (target, property) =>
				extendedPage[property] || browser[property] || page[property],
		})
	}
	constructor(page) {
		this.page = page
	}
	async waitAndClick(selector) {
		await this.page.waitForSelector(selector)
		await this.page.click(selector)
	}
	async waitAndType(selector, text, xpath = false) {
		try {
			if (xpath) {
				await this.page.waitForXPath(selector)
				const input = await this.page.$x(selector)
				input.length > 1 &&
					console.warn('the field you entered returned more than one result')
				await input[0].type(text)
			} else {
				await this.page.waitForSelector(selector)
				await this.page.type(selector, text)
			}
		} catch (error) {
			throw new Error(`Could type on selector ${selector}`)
		}
	}
	async getText(selector) {
		await this.page.waitForSelector(selector)
		return await this.page.$eval(selector, (e) => e.innerHTML)
	}
	async getCount(selector) {
		await this.page.waitForSelector(selector)
		return await this.page.$$eval(selector, (items) => items.length)
	}
	async waitForXpathAndClick(xpath) {
		await this.page.waitForXPath(xpath)
		const elements = await this.page.$x(xpath)
		elements.length > 1 &&
			console.warn('waitForXpath returned more than one result')
		await elements[0].click()
	}
	async waitForTex(selector, text) {
		try {
			await this.page.waitForSelector(selector)
			await this.page.waitForFunction(
				(selector, text) =>
					document.querySelector(selector).innerText.includes(text),
				{},
				selector,
				text
			)
		} catch (error) {
			console.error(error)
			throw new Error(`Could get the text on selector ${selector}`)
		}
	}
	async isElementVisible(selector, xpath = false) {
		let visible = true

		if (xpath) {
			await this.page
				.waitForXPath(selector, { hidden: false, timeout: 3000 })
				.catch((e) => (visible = false))
			return visible
		} else {
			await this.page
				.waitForSelector(selector, {
					hidden: false,
					timeout: 3000,
				})
				.catch((e) => (visible = false))
			console.log(visible)
			return visible
		}
	}
}
