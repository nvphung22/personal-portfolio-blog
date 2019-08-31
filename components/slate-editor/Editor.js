import React from 'react';
import { Editor } from 'slate-react';
import { renderMark, renderBlock } from './renderers';
import { HoverMenu } from './HoverMenu';
import { initialValue } from './initial-value';

export default class SlateEditor extends React.Component {
    state = {
        value: initialValue,
    }

    menuRef = React.createRef()

    onChange = ({ value }) => {
        this.setState({ value })
    }
    /**
    * On update, update the menu.
    */

    componentDidMount = () => {
        this.updateMenu()
    }

    componentDidUpdate = () => {
        this.updateMenu()
    }

    /**
    * Update the menu's absolute position.
    */

    updateMenu = () => {
        const menu = this.menuRef.current
        if (!menu) return

        const { value } = this.state
        const { fragment, selection } = value

        if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
            menu.removeAttribute('style')
            return
        }

        const native = window.getSelection()
        const range = native.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        menu.style.opacity = 1
        menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

        menu.style.left = `${rect.left +
            window.pageXOffset -
            menu.offsetWidth / 2 +
            rect.width / 2}px`
    }

    render() {
        return (
            <Editor
                placeholder="Enter some text..."
                value={this.state.value}
                onChange={this.onChange}
                renderMark={renderMark}
                renderBlock={renderBlock}
                renderEditor={this.renderEditor}
            />
        )
    }

    renderEditor = (props, editor, next) => {
        const children = next()
        return (
            <React.Fragment>
                {children}
                <HoverMenu ref={this.menuRef} editor={editor} />
            </React.Fragment>
        )
    }
}