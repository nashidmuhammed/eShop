import { Avatar, Badge, Button, Dropdown, Layout, Menu, Space, theme } from 'antd';
import { FileOutlined, UserOutlined, PieChartOutlined, BellOutlined, MessageOutlined, MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons';
const { Header } = Layout;

const Headers = ({collapsed, setCollapsed, collapsedWidth}) => {
    const organizationDetails = JSON.parse(localStorage.getItem('organizationDetails'));
    const items = [
    {
      label: (
        <a href={`/admin/organization-settings?pk=${organizationDetails.id}`}>Profile</a>
      ),
      key: '0',
    },
    {
      label: 'Switch Organization',
      key: 'switch',
    },
    {
      label: 'Create Organization',
      key: 'create',
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Settings
        </a>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (<span className='text-red-600'>Logout</span>),
      key: '3',
      disabled: false,
    },
  ];
  console.log("collapsed==>",collapsed);
  const organization_name = JSON.parse(localStorage.getItem('organizationDetails'))?.name;
  return (
    <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            padding: 0,
            // display: 'flex',
            // background: colorBgContainer,
            background:'#000'
          }}
        >
            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    color: '#fff',
                    marginLeft: ((collapsedWidth === 0 &&  collapsed === false) && '200px'),
                    }}
                />
                <p className='text-white font-bold text-lg'>{organization_name}</p>

              </div>
            <div className='flex items-center'>
              <div className='mr-5'>
                <Badge count={3}>
                <BellOutlined className='text-white text-lg bg-slate-400 p-2 rounded-full cursor-pointer' />
                </Badge>
              </div>
              <div className='mr-5'>
                <Badge count={1}>
                <MessageOutlined className='text-white text-lg bg-slate-400 p-2 rounded-full cursor-pointer' />
                </Badge>
              </div>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <div className='text-white p-0 mr-3 flex justify-between items-center gap-x-2'>
                  <div className='leading-4 text-center'>
                    <span>Username</span>
                    <span className='text-slate-400 text-sm block'>Admin</span>
                  </div>
                  <Avatar size={45}  icon={<UserOutlined />} style={{ backgroundColor: '#fde3cf',}} />
                  <DownOutlined />
                </div>
              </a>
            </Dropdown>
            </div>
            </div>
        </Header>
  )
}

export default Headers