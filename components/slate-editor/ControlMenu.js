import { Button } from 'reactstrap';

export const ControlMenu = (props) => {
    const { isSaving } = props
    return (
        <div className='control-menu'>
            <h1 className='title'>Write your story...</h1>
            <div className='status-box'>
                {isSaving ? 'Saving...' : 'Saved'}
            </div>
            <Button disabled={isSaving} onClick={props.saveBlog} color='success'>Save</Button>
        </div>
    )
}