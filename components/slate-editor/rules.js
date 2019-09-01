const BLOCK_TAGS = {
    p: 'paragraph',
    blockquote: 'block-quote',
    ol: 'numbered-list',
    ul: 'bulleted-list',
    li: 'list-item',
    h1: 'heading-one',
    h2: 'heading-two',
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
    strong: 'bold',
    code: 'code',
    em: 'italic',
    u: 'underlined',
}

export const rules = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'block',
                    type: type,
                    nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object == 'block') {
                switch (obj.type) {
                    case 'paragraph':
                        return <p>{children}</p>
                    case 'block-quote':
                        return <blockquote>{children}</blockquote>
                    case 'numbered-list':
                        return <ol>{children}</ol>
                    case 'bulleted-list':
                        return <ul>{children}</ul>
                    case 'list-item':
                        return <li>{children}</li>
                    case 'heading-one':
                        return <h1>{children}</h1>
                    case 'heading-two':
                        return <h2>{children}</h2>
                }
            }
        },
    },
    // Add a new rule that handles marks...
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'mark',
                    type: type,
                    nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object == 'mark') {
                switch (obj.type) {
                    case 'bold':
                        return <strong>{children}</strong>
                    case 'code':
                        return <code>{children}</code>
                    case 'italic':
                        return <em>{children}</em>
                    case 'underlined':
                        return <u>{children}</u>
                }
            }
        },
    },
]