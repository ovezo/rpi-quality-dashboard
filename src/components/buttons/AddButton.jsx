import { Add } from '@mui/icons-material'
import PrimaryButton from './PrimaryButton'

const AddButton = (props) => (
  <PrimaryButton {...props} Icon={<Add/>} />
)

export default AddButton