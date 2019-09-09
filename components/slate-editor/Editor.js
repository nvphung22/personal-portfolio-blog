import React from 'react';
import { Editor } from 'slate-react';
import { renderMark, renderBlock } from './renderers';
import { HoverMenu } from './HoverMenu';
import { initialValue } from './initial-value';
import { ControlMenu } from './ControlMenu';
import Html from 'slate-html-serializer';
import { rules } from './rules';
import { Value } from 'slate';


const html = new Html({ rules })

export default class SlateEditor extends React.Component {
    state = {
        value: Value.create()
    }

    menuRef = React.createRef()

    onChange = ({ value }) => {
        this.setState({ value })
    }

    onKeyDown = (event, change, next) => {
        const { isLoading } = this.props;

        // ----- AUTO SAVE WHEN Ctrl + S OR Command + S -----
        // 83: button S
        // ctrlKey: button Ctrl
        // metaKey: button Command
        if (!isLoading && event.which === 83 && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            this.save();
        }
        next();
    }
    
    /**
    * On update, update the menu.
    */

    componentDidMount = () => {
        const valueFromProps = this.props.initialValue;
        const value = valueFromProps ? Value.fromJSON(html.deserialize(valueFromProps)) : Value.fromJSON(initialValue);
        this.updateMenu();
        this.setState({ value })
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

    getTitle = () => {
        const { value } = this.state;
        const firstBlock = value.document.getBlocks().get(0);
        const secondBlock = value.document.getBlocks().get(1);

        const title = firstBlock && firstBlock.text ? firstBlock.text : 'No title';
        const subTitle = secondBlock && secondBlock.text ? secondBlock.text : 'No sub-title';
        return {
            title,
            subTitle
        }
    }

    save = () => {
        const { value } = this.state;
        const { isSaving, saveBlog } = this.props;
        const headingValues = this.getTitle();
        const text = html.serialize(value);
        // prevent multiple savings
        !isSaving && saveBlog(text, headingValues);
    }

    render() {
        return (
            <React.Fragment>
                <ControlMenu isSaving={this.props.isSaving} saveBlog={this.save} />
                <Editor
                    placeholder="Enter some text..."
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={renderMark}
                    renderBlock={renderBlock}
                    renderEditor={this.renderEditor}
                />
                <style jsx>
                    {`
                        @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
                    `}
                </style>
            </React.Fragment>
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