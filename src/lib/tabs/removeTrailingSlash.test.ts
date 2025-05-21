import { removeTrailingSlash } from './removeTrailingSlash'

describe('removeTrailingSlash', () => {
  it('should remove single trailing slash', () => {
    expect(removeTrailingSlash('test/')).toBe('test')
  })

  it('should remove multiple trailing slashes', () => {
    expect(removeTrailingSlash('test///')).toBe('test')
  })

  it('should not modify string without trailing slash', () => {
    expect(removeTrailingSlash('test')).toBe('test')
  })

  it('should handle empty string', () => {
    expect(removeTrailingSlash('')).toBe('')
  })

  it('should handle string with only slashes', () => {
    expect(removeTrailingSlash('///')).toBe('')
  })
})
