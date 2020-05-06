export default class PostInputsValidation {
    inputsValidation(title,slug,content,validSlug) {
        const missInputs = {}

        if (!title) {
            missInputs.title = 'Title is required'
        }
        if (!content) {
            missInputs.content = 'Content is required'
        }
        if (!slug) {
            missInputs.slug = 'Slug is required'
        }
        if (validSlug && !validSlug.match(/^[0-9a-z.\-]+$/)) {
            missInputs.slug = 'Invalid slug, only alphanumeric characters without accents!'
        }

        return missInputs;
    }
}