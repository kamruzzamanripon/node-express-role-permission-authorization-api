import Layout from '../components/layout/Layout';
import Permissions from '../components/permission/Permissions';
import { canRole } from '../utils/roleHook';


export default function permissionPage() {
  return (
    <Layout title='Permission'>
        {canRole('SuperAdmin') ? <Permissions /> : <h1>You are not authorized</h1>}
    </Layout>
  )
}
