import * as React from "react";

import { Editor, RichUtils, EditorState } from 'draft-js';
import { EventDescriptionProps } from './EventDescription.model';
import 'draft-js/dist/Draft.css';
import './EventDescription.scss';

export class CaEventDescription extends React.Component<{}, { editorState: EditorState }> {
  constructor(props: EventDescriptionProps) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  public onChange: (editorState: EditorState) => void = (editorState: EditorState) => {
    this.setState({ editorState });
    const myText = this.state.editorState.getCurrentContent().getPlainText();
    console.log(myText);
  };

  public handleKeyCommand: (command: string) => boolean = (command: string) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  public toggleBlockType: (blockType: string) => void = (blockType: string) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    console.log(blockType);
  }

  public toggleInlineStyle: (inlineStyle: string) => void = (inlineStyle: string) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  public render(): JSX.Element {
    let className = 'RichEditor-editor';
    var contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className}>
          <Editor
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Description..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

class StyleButton extends React.Component<EventDescriptionProps, {}> {
  public onToggle: (event: React.MouseEvent<HTMLSpanElement>) => void = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    this.props.onToggle(this.props.style);
  };

  public render(): JSX.Element {
    let className = 'RichEditor-styleButton';

    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props: { editorState: EditorState, onToggle: (blockType: string) => void }) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props: { editorState: EditorState, onToggle: (blockType: string) => void }) => {
  let currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};