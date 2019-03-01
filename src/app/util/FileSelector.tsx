import * as React from 'react';

export class FileSelector extends React.Component<FileSelectorProps> {
    input: HTMLInputElement | null = null;

    render() {
        return (
            <div onClick={() => {
                if (this.input) this.input.click()
            }}>
                <input
                    type="file"
                    ref={element => this.input = element}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        this.props.onLoadFile(event.target.files)
                    }}
                    hidden
                />
                {this.props.component}
            </div>
        )
    }
}

export interface FileSelectorProps {
    onLoadFile: (files: FileList | null) => void,
    component: React.ReactNode
}

export default FileSelector;
