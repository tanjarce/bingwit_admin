import React from 'react'
import ActionDropdown from '../components/ActionDropdown'


const ACC_ADMIN = 'ACC_ADMIN'
const ACC_USER = 'ACC_USER'

export const menus = {
    dashboard: "/dashboard",
    maps: "/maps",
    food: "/food",
    users: "/users",
    accounts: "/accounts",
    billings: "/billings",
}

export const user = ['dashboard', 'maps', 'food' ]

export function getPermission (type) {
    const accType = formatRole(type)
    switch (accType) {
        case ACC_USER:
            return user.map(key => ({
                title: key,
                url: menus[key]
            }))
        default: 
            return Object.keys(menus).map(key => ({
                title: key,
                url: menus[key]
            }))
    }
}

export function formatRole (type) {
    switch (type) {
        case 'USER':
            return ACC_USER
        default: 
            return ACC_ADMIN
    }
}

//TAB
export const columnsRules = [{
        Header: 'No:',
        accessor: 'number', // String-based value accessors!
        width: 80,
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Date Created',
        accessor: 'date',
        width: 200
      },
      {
        Header: ' ',
        accessor: 'action',
        width: 50,
        Cell: rowInfo => 
            <ActionDropdown info={rowInfo.value} options={[
                {'text': 'View', 'func': (info) => {console.log('view', info)}},
                {'text': 'Delete', 'func': (info) => {console.log('view', info)}},
            ]}/>
      }]
      
export const columnsReports = [{
    Header: 'Account User',
    accessor: 'number', // String-based value accessors!
    width : 150
  }, {
    Header: 'Feedback Description',
    accessor: 'description'
  },
  {
    Header: 'Sent Date',
    accessor: 'date',
    width: 200
  },
  {
    Header: ' ',
    accessor: ' ',
    width: 50
  }]
  
export const tabs = [
    {'text': 'Rules', 'url': '/list/rules'},
    {'text': 'Products', 'url': '/list/products'},
]
//TABLE DATA 
export const data = [{
    number: 1,
    description: 'Walang sino man ang pwedeng mag benta ng nanganganib na isda.',
    date: 'October 3, 2018',
    action: 'specify the info needed for actions option'
  },{
    number: 2,
    description: 'Laging i-prayoridad ang kalidad ng isda.',
    date: 'October 3, 2018',
    action: 'specify the info needed for actions option'
  },{
    number: 3,
    description: 'Bawal mangloko ng kapwa.',
    date: 'October 2, 2018',
    action: 'specify the info needed for actions option'
  },{
    number: 4,
    description: 'Huwag ibenta ang produkto kapag ito ay 2-3 araw ng nakatambak.',
    date: 'October 3, 2018',
    action: 'specify the info needed for actions option'
  },{
    number: 5,
    description: 'Siguraduhing tama ang bilang na ilagay sa bawat produkto.',
    date: 'October 4, 2018',
    action: 'specify the info needed for actions option'
  },{
    number: 6,
    description: 'Dapat laging tama ang presyo ng produkto.',
    date: 'October 5, 2018',
    action: 'specify the info needed for actions option'
  },
]


// USER DATA
export const user1 = {
    'name' : 'Alberto Aquino',
    'role' : 'Fisherman',
    'src' : require('../assets/ProfileUser.png'),
    'address' : '#2381 Bongkok St. Baguio City, Benguet',
    'province' : 'Benguet, Philippines',
    'contact' : '+63 912-345-6776',
    'status' : 'Active',
    'bio' : 'Ako si Alberto. Isang peshirman nangagarap maging wrapper. Marunong ako mag wrap idol ko si Gloc 9, kaso sa hirap ng buhay isa lang akong mangengesda sa benguet. 29 na anak ang aking binubuhay. Panay isda lang ang amin nakakain. Pileng ko nga may hasang na ko. Pero ayos lang. Nakakain naman kami lagi ng Lobster, Lapu-lapu, Salmon. Marami pang iba eh, tuwing umaga Crab, sa tanghali naman Bay Eel .. tapos sa gabi Bluefin Tuna lang nakakain namin. Minsan lang kami nakain ng mamahalin na pagkain... kung susuwertehin tuyo. Paborito ko talaga iyon. ang sarap. *Crying* ang hirap ng buhay T_T.'
    ,
    'ratings' : '5.0',
    'sales' : '300,129.50'
};

// SIDEBAR ITEM
export const bingwitmenus = [{
    'id' : 1,
    'src' : <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.9414 4.32476L27.7227 0.280007C27.5859 0.0301176 27.2529 -0.0713803 26.9787 0.0533118C26.9786 0.053375 26.9785 0.0534382 26.9783 0.0535014L22.5409 2.07588C22.2668 2.20069 22.1555 2.50449 22.2924 2.75438C22.4294 3.00427 22.7626 3.10571 23.0368 2.98089L26.2506 1.51719L25.3736 3.79944C21.5191 13.8056 11.5912 20.8256 0 21.7409L0.0942948 22.7521C12.1222 21.8024 22.4237 14.517 26.4214 4.13314L27.3167 1.80134L28.9485 4.77676C29.0855 5.02665 29.4188 5.12808 29.6929 5.00326C29.9671 4.87844 30.0783 4.57471 29.9414 4.32476Z" fill="#7B8F9E"/>
    <path d="M4.48428 25.9544H0.601551C0.295231 25.9544 0.046875 26.1808 0.046875 26.46V29.4935C0.046875 29.7727 0.295231 29.9991 0.601551 29.9991H4.48428C4.7906 29.9991 5.03896 29.7727 5.03896 29.4935V26.46C5.03896 26.1808 4.7906 25.9544 4.48428 25.9544ZM3.92961 28.9879H1.15623V26.9656H3.92961V28.9879Z" fill="#7B8F9E"/>
    <path d="M10.5868 24.4378H6.70409C6.39777 24.4378 6.14941 24.6642 6.14941 24.9434V29.4937C6.14941 29.773 6.39777 29.9993 6.70409 29.9993H10.5868C10.8931 29.9993 11.1415 29.773 11.1415 29.4937V24.9434C11.1415 24.6642 10.8931 24.4378 10.5868 24.4378ZM10.0321 28.9881H7.25877V25.449H10.0321V28.9881Z" fill="#7B8F9E"/>
    <path d="M16.6879 21.9101H12.8052C12.4988 21.9101 12.2505 22.1365 12.2505 22.4157V29.494C12.2505 29.7732 12.4988 29.9996 12.8052 29.9996H16.6879C16.9942 29.9996 17.2426 29.7732 17.2426 29.494V22.4157C17.2426 22.1365 16.9942 21.9101 16.6879 21.9101ZM16.1332 28.9884H13.3598V22.9213H16.1332V28.9884Z" fill="#7B8F9E"/>
    <path d="M22.789 18.3713H18.9062C18.5999 18.3713 18.3516 18.5977 18.3516 18.8769V29.4944C18.3516 29.7736 18.5999 30 18.9062 30H22.789C23.0953 30 23.3436 29.7736 23.3436 29.4944V18.8769C23.3436 18.5977 23.0953 18.3713 22.789 18.3713ZM22.2343 28.9888H19.4609V19.3825H22.2343V28.9888Z" fill="#7B8F9E"/>
    <path d="M28.8915 11.2921H25.0088C24.7025 11.2921 24.4541 11.5184 24.4541 11.7976V29.4934C24.4541 29.7726 24.7025 29.999 25.0088 29.999H28.8915C29.1978 29.999 29.4462 29.7726 29.4462 29.4934V11.7976C29.4462 11.5184 29.1978 11.2921 28.8915 11.2921ZM28.3368 28.9878H25.5635V12.3032H28.3368V28.9878Z" fill="#7B8F9E"/>
    </svg>,
    'title' : 'Dashboard',
    'url' : '/dashboard'
},{
    'id' : 2,
    'src' : <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 15.0018C30 6.73554 23.2645 0 14.9982 0C6.73201 0 0 6.73554 0 15.0018C0 19.5548 2.06569 23.6506 5.27931 26.4037C5.31828 26.4426 5.35725 26.4816 5.43167 26.5171C8.03235 28.6997 11.3629 30 15.0372 30C18.6335 30 21.9641 28.6997 24.5648 26.595C24.7172 26.556 24.8341 26.4426 24.9085 26.3257C28.0123 23.5337 30 19.5158 30 15.0018ZM1.37828 15.0018C1.37828 7.50088 7.50088 1.37828 15.0018 1.37828C22.5026 1.37828 28.6252 7.50088 28.6252 15.0018C28.6252 18.676 27.1726 22.003 24.7986 24.455C24.416 22.655 23.268 19.5937 19.7461 17.606C20.5504 16.6104 21.0075 15.3101 21.0075 13.9318C21.0075 10.6401 18.3288 7.96152 15.0372 7.96152C11.7456 7.96152 9.06696 10.6401 9.06696 13.9318C9.06696 15.3101 9.56299 16.5714 10.3283 17.606C6.77456 19.5937 5.62657 22.6551 5.28284 24.455C2.86995 22.0421 1.37828 18.676 1.37828 15.0018ZM10.4098 13.9672C10.4098 11.4409 12.4755 9.3752 15.0018 9.3752C17.528 9.3752 19.5937 11.4409 19.5937 13.9672C19.5937 16.4934 17.528 18.5591 15.0018 18.5591C12.4755 18.5591 10.4098 16.4934 10.4098 13.9672ZM6.50525 25.6384C6.58319 24.5294 7.1926 20.7772 11.3275 18.6725C12.3621 19.4768 13.6235 19.9339 15.0018 19.9339C16.3801 19.9339 17.6804 19.4378 18.715 18.6335C22.8109 20.7382 23.4593 24.4125 23.5762 25.5994C21.2413 27.4738 18.2579 28.6217 15.0443 28.6217C11.7881 28.6252 8.8402 27.5162 6.50525 25.6384Z" fill="#7B8F9E"/>
    </svg>,
    'title' : 'Account Setting',
    'url' : '/account'
},{
    'id' : 3,
    'src' : <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0001 5.562C16.5063 5.562 17.7274 4.31688 17.7274 2.781C17.7274 1.24511 16.5063 0 15.0001 0C13.4939 0 12.2728 1.24511 12.2728 2.781C12.2728 4.31688 13.4938 5.562 15.0001 5.562ZM15.0001 1.3905C15.7532 1.3905 16.3637 2.01302 16.3637 2.781C16.3637 3.54897 15.7532 4.1715 15.0001 4.1715C14.247 4.1715 13.6365 3.54897 13.6365 2.781C13.6365 2.01302 14.247 1.3905 15.0001 1.3905Z" fill="#7B8F9E"/>
    <path d="M15.9907 6.01304C15.9786 6.01324 15.9666 6.01358 15.9546 6.01391H14.0455C11.9941 5.95596 10.285 7.60482 10.2281 9.69669C10.2278 9.70893 10.2276 9.72124 10.2273 9.73349V10.2897C10.2273 10.6721 10.6023 10.8807 10.9773 10.8807H19.0227C19.3977 10.8807 19.7727 10.6721 19.7727 10.2897V9.73349C19.7358 7.64115 18.0425 5.97545 15.9907 6.01304ZM11.6591 9.49009C11.7273 8.44725 12.7841 7.40434 14.0454 7.40434H15.9545C17.2159 7.40434 18.2727 8.44718 18.3409 9.49009H11.6591Z" fill="#7B8F9E"/>
    <path d="M3.9206 17.6593C4.29717 17.6593 4.60242 17.348 4.60242 16.964C4.60026 13.7479 6.0298 10.7046 8.48876 8.69057C8.75851 8.42263 8.76412 7.98248 8.50135 7.70742C8.27278 7.46815 7.90958 7.42849 7.6365 7.61293C4.8524 9.88592 3.23395 13.3272 3.23878 16.964C3.23878 17.348 3.54403 17.6593 3.9206 17.6593Z" fill="#7B8F9E"/>
    <path d="M18.3229 27.0043C18.3175 27.0063 18.3121 27.0083 18.3069 27.0103C16.1719 27.739 13.8623 27.739 11.7273 27.0103C11.3697 26.8967 10.9892 27.0985 10.8751 27.4622C10.7455 27.8022 10.9109 28.185 11.2443 28.317C11.2574 28.3222 11.2707 28.327 11.2841 28.3313C13.7055 29.1657 16.3287 29.1657 18.75 28.3313C19.1114 28.1998 19.3069 27.8012 19.1932 27.4274C19.0675 27.0656 18.6778 26.8761 18.3229 27.0043Z" fill="#7B8F9E"/>
    <path d="M21.0001 8.3082C23.7615 10.2906 25.4025 13.5205 25.3978 16.9641C25.3978 17.348 25.7031 17.6593 26.0796 17.6593C26.4562 17.6593 26.7615 17.348 26.7615 16.9641C26.752 13.0686 24.8983 9.41751 21.7842 7.16103C21.4735 6.94026 21.0462 7.01804 20.8296 7.33483C20.6131 7.65161 20.6894 8.08743 21.0001 8.3082Z" fill="#7B8F9E"/>
    <path d="M4.7728 24.6813C6.27902 24.6813 7.50008 23.4362 7.50008 21.9003C7.50008 20.3644 6.27902 19.1193 4.7728 19.1193C3.26659 19.1193 2.04553 20.3644 2.04553 21.9003C2.04553 23.4363 3.26659 24.6813 4.7728 24.6813ZM4.7728 20.5098C5.52594 20.5098 6.13644 21.1323 6.13644 21.9003C6.13644 22.6683 5.52594 23.2908 4.7728 23.2908C4.01967 23.2908 3.40917 22.6683 3.40917 21.9003C3.40917 21.1323 4.01967 20.5098 4.7728 20.5098Z" fill="#7B8F9E"/>
    <path d="M5.76345 25.1324C5.75138 25.1326 5.73937 25.1329 5.72736 25.1333H3.81822C1.76676 25.0753 0.0576828 26.7242 0.000848276 28.816C0.000522016 28.8283 0.000261008 28.8406 0 28.8528V29.409C0 29.7914 0.375003 30 0.750006 30H8.79545C9.17045 30 9.54545 29.7914 9.54545 29.409V28.8528C9.50865 26.7605 7.81536 25.0948 5.76345 25.1324ZM1.43189 28.6094C1.50008 27.5666 2.5569 26.5237 3.81822 26.5237H5.7273C6.98869 26.5237 8.04551 27.5665 8.11363 28.6094H1.43189Z" fill="#7B8F9E"/>
    <path d="M22.5 21.9003C22.5 23.4362 23.7211 24.6813 25.2273 24.6813C26.7335 24.6813 27.9545 23.4362 27.9545 21.9003C27.9545 20.3644 26.7335 19.1193 25.2273 19.1193C23.7211 19.1193 22.5 20.3644 22.5 21.9003ZM26.5909 21.9003C26.5909 22.6683 25.9804 23.2908 25.2273 23.2908C24.4741 23.2908 23.8636 22.6683 23.8636 21.9003C23.8636 21.1323 24.4741 20.5098 25.2273 20.5098C25.9804 20.5098 26.5909 21.1323 26.5909 21.9003Z" fill="#7B8F9E"/>
    <path d="M26.218 25.1324C26.2059 25.1326 26.1939 25.1329 26.1819 25.1333H24.2728C22.2214 25.0753 20.5123 26.7242 20.4554 28.816C20.4551 28.8283 20.4549 28.8406 20.4546 28.8528V29.409C20.4546 29.7914 20.8296 30 21.2046 30H29.25C29.625 30 30 29.7914 30 29.409V28.8528C29.9632 26.7605 28.2699 25.0948 26.218 25.1324ZM21.8864 28.6094C21.9546 27.5666 23.0114 26.5237 24.2727 26.5237H26.1818C27.4432 26.5237 28.5 27.5665 28.5682 28.6094H21.8864Z" fill="#7B8F9E"/>
    </svg>,
    'title' : 'Manage User',
    'url' : '/mnguser'
},{
    'id' : 4,
    'src' : <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.1608 20.4419H27.1588C26.2212 20.4414 25.6919 19.9937 25.3889 18.9459C25.0791 17.8743 25.0687 16.3202 25.0578 14.6748C25.0446 12.6812 25.0296 10.4217 24.4911 8.40088C24.4274 8.16193 24.1649 8.01567 23.9052 8.07426C23.6458 8.13286 23.4868 8.3741 23.5502 8.61305C24.0619 10.532 24.0764 12.7359 24.0893 14.6803C24.1007 16.384 24.1112 17.9933 24.4528 19.1748C24.6013 19.6886 24.8142 20.1109 25.0893 20.4419H4.91065C5.18579 20.1109 5.39873 19.6886 5.54725 19.1748C5.8888 17.9933 5.8995 16.384 5.91069 14.6803C5.92786 12.079 5.94751 9.13078 7.10427 6.87447C8.40632 4.33456 10.989 3.09975 15.0001 3.09975C17.203 3.09975 19.0055 3.48061 20.3576 4.23203C21.53 4.88342 22.3907 5.80925 22.989 7.06238C23.0965 7.2876 23.3823 7.39014 23.6271 7.29103C23.8719 7.19215 23.9833 6.9294 23.8759 6.70395C23.2039 5.29678 22.1887 4.20845 20.8583 3.46916C20.009 2.99721 19.0117 2.65686 17.8759 2.44949C17.7614 1.08147 16.5159 0 15.0001 0C13.4844 0 12.2386 1.0817 12.1249 2.44995C11.0413 2.64748 10.0833 2.96585 9.26108 3.40416C7.93814 4.10957 6.9177 5.14938 6.22812 6.49429C4.98031 8.92845 4.95991 11.9813 4.94224 14.6748C4.9313 16.3202 4.9211 17.8743 4.61114 18.9459C4.30814 19.9937 3.77876 20.4414 2.84116 20.4419H2.83917C1.27368 20.4419 0 21.6138 0 23.0544C0 24.4947 1.27368 25.6666 2.83917 25.6666H5.90422C6.17165 25.6666 6.38857 25.467 6.38857 25.2209C6.38857 24.9749 6.17165 24.7755 5.90422 24.7755H2.83917C1.80779 24.7755 0.968448 24.0033 0.968448 23.0544C0.968448 22.1054 1.80754 21.3334 2.83892 21.3332H2.83917H2.84091H27.1588H27.1606H27.1611C28.1922 21.3334 29.0313 22.1054 29.0313 23.0544C29.0313 24.0033 28.192 24.7755 27.1606 24.7755H7.84137C7.57395 24.7755 7.35727 24.9749 7.35727 25.2209C7.35727 25.467 7.57395 25.6666 7.84137 25.6666H9.82926C10.0743 28.0936 12.2993 30 15.0001 30C17.7007 30 19.9257 28.0936 20.1707 25.6666H27.1608C28.7263 25.6666 30 24.4947 30 23.0544C30 21.6138 28.7263 20.4419 27.1608 20.4419ZM15.0001 0.891037C15.9275 0.891037 16.7032 1.50055 16.8791 2.3069C16.2845 2.24236 15.6586 2.20871 15.0001 2.20871C14.3416 2.20871 13.7157 2.24213 13.1214 2.30667C13.2973 1.50032 14.0727 0.891037 15.0001 0.891037ZM15.0001 29.109C12.8339 29.109 11.044 27.6011 10.8029 25.6666H19.1971C18.956 27.6011 17.1661 29.109 15.0001 29.109Z" fill="#7B8F9E"/>
    <path d="M22.7118 2.81834C22.7207 2.82266 23.5948 3.27199 24.4548 4.3158C25.6068 5.71376 26.1907 7.46019 26.1907 9.5067C26.1907 9.7509 26.4106 9.94899 26.6817 9.94899C26.9528 9.94899 27.1727 9.7509 27.1727 9.5067C27.1727 6.68943 26.1047 4.81942 25.2086 3.74698C24.224 2.56846 23.2301 2.06575 23.1882 2.04485C22.9514 1.92718 22.6543 2.00441 22.5227 2.21704C22.391 2.42989 22.476 2.69885 22.7118 2.81834Z" fill="#7B8F9E"/>
    <path d="M26.4541 2.97379C26.5331 3.02133 28.3896 4.16681 28.3896 7.0487C28.3896 7.29802 28.6096 7.50003 28.8808 7.50003C29.152 7.50003 29.3717 7.29802 29.3717 7.0487C29.3717 3.64961 27.0813 2.27036 26.9836 2.21331C26.7558 2.07995 26.4546 2.14164 26.3083 2.35061C26.162 2.55934 26.2278 2.83811 26.4541 2.97379Z" fill="#7B8F9E"/>
    <path d="M3.31785 9.94899C3.58891 9.94899 3.80879 9.75091 3.80879 9.50671C3.80879 7.46021 4.39279 5.7138 5.54439 4.31585C6.39895 3.27863 7.26763 2.82839 7.28679 2.8184C7.52306 2.70005 7.6088 2.43154 7.47793 2.21824C7.34655 2.00448 7.048 1.92702 6.81072 2.04491C6.76886 2.06581 5.77511 2.56852 4.79069 3.74703C3.89503 4.81946 2.82715 6.68945 2.82715 9.50671C2.82715 9.75091 3.04678 9.94899 3.31785 9.94899Z" fill="#7B8F9E"/>
    <path d="M1.11911 7.50003C1.39017 7.50003 1.6098 7.29802 1.6098 7.0487C1.6098 4.16911 3.4626 3.02294 3.5443 2.974C3.77123 2.83971 3.8378 2.56164 3.69281 2.35198C3.54732 2.14162 3.24398 2.07969 3.01503 2.21352C2.9177 2.27057 0.628174 3.6496 0.628174 7.0487C0.628174 7.29802 0.848049 7.50003 1.11911 7.50003Z" fill="#7B8F9E"/>
    </svg>,
    'title' : 'Notifications',
    'url' : '/notif'
},{
    'id' : 5,
    'src' : <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0.5V27.5C0 27.6326 0.071932 27.7598 0.199773 27.8535L2.92705 29.8535C3.05489 29.9473 3.22824 30 3.40909 30H29.3182C29.6947 30 30 29.7761 30 29.5V2.5C30 2.36737 29.9281 2.24025 29.8002 2.1465L27.073 0.1465C26.9451 0.05275 26.7718 0 26.5909 0H0.681818C0.305284 0 0 0.223875 0 0.5ZM26.3086 1L28.6364 2.707V5.793L22.1005 1H26.3086ZM21.1364 1.707L27.6723 6.5H21.1364V1.707ZM1.36364 1H19.7727V7C19.7727 7.27612 20.078 7.5 20.4545 7.5H28.6364V29H3.69136L1.36364 27.293V1Z" fill="#7B8F9E"/>
    <path d="M6.13641 9.5H23.8637C24.2402 9.5 24.5455 9.27613 24.5455 9C24.5455 8.72387 24.2402 8.5 23.8637 8.5H6.13641C5.75987 8.5 5.45459 8.72387 5.45459 9C5.45459 9.27613 5.75987 9.5 6.13641 9.5Z" fill="#7B8F9E"/>
    <path d="M6.13641 12.5H23.8637C24.2402 12.5 24.5455 12.2761 24.5455 12C24.5455 11.7239 24.2402 11.5 23.8637 11.5H6.13641C5.75987 11.5 5.45459 11.7239 5.45459 12C5.45459 12.2761 5.75987 12.5 6.13641 12.5Z" fill="#7B8F9E"/>
    <path d="M6.13641 15.5H23.8637C24.2402 15.5 24.5455 15.2761 24.5455 15C24.5455 14.7239 24.2402 14.5 23.8637 14.5H6.13641C5.75987 14.5 5.45459 14.7239 5.45459 15C5.45459 15.2761 5.75987 15.5 6.13641 15.5Z" fill="#7B8F9E"/>
    <path d="M6.13641 18.5H23.8637C24.2402 18.5 24.5455 18.2761 24.5455 18C24.5455 17.7239 24.2402 17.5 23.8637 17.5H6.13641C5.75987 17.5 5.45459 17.7239 5.45459 18C5.45459 18.2761 5.75987 18.5 6.13641 18.5Z" fill="#7B8F9E"/>
    <path d="M6.13641 21.5H23.8637C24.2402 21.5 24.5455 21.2761 24.5455 21C24.5455 20.7239 24.2402 20.5 23.8637 20.5H6.13641C5.75987 20.5 5.45459 20.7239 5.45459 21C5.45459 21.2761 5.75987 21.5 6.13641 21.5Z" fill="#7B8F9E"/>
    <path d="M6.13641 24.5H23.8637C24.2402 24.5 24.5455 24.2761 24.5455 24C24.5455 23.7239 24.2402 23.5 23.8637 23.5H6.13641C5.75987 23.5 5.45459 23.7239 5.45459 24C5.45459 24.2761 5.75987 24.5 6.13641 24.5Z" fill="#7B8F9E"/>
    <path d="M15.0001 7.5C16.5063 7.5 17.7274 6.60456 17.7274 5.5C17.7274 4.39544 16.5063 3.5 15.0001 3.5C13.4939 3.5 12.2728 4.39544 12.2728 5.5C12.2728 6.60456 13.4939 7.5 15.0001 7.5ZM15.0001 4.5C15.7533 4.5 16.3637 4.94769 16.3637 5.5C16.3637 6.05231 15.7533 6.5 15.0001 6.5C14.2469 6.5 13.6365 6.05231 13.6365 5.5C13.6365 4.94769 14.2469 4.5 15.0001 4.5Z" fill="#7B8F9E"/>
    </svg>
    ,
    'title' : 'List',
    'url' : '/list'
}];

export const logout = {
    'id' : 6,
    'src' : <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.50011 12.9951C6.22413 12.9951 6.00012 13.2191 6.00012 13.4952V16.4955C6.00012 16.7715 6.22413 16.9955 6.50011 16.9955C6.77609 16.9955 7.0001 16.7715 7.0001 16.4955V13.4952C7.00016 13.2191 6.77615 12.9951 6.50011 12.9951Z" fill="#7B8F9E"/>
    <path d="M6.55414 0.133674L1.82652 2.0254C0.49501 2.51847 0 3.18756 0 4.49417V25.501C0 26.8076 0.49501 27.4767 1.81404 27.9658L6.56363 29.866C6.79866 29.955 7.03462 30 7.26566 30C8.27068 30 9.00019 29.1599 9.00019 28.0023V1.99394C9.00019 0.571768 7.86614 -0.360326 6.55414 0.133674ZM8.00014 28.0023C8.00014 28.5988 7.70512 28.9999 7.26566 28.9999C7.15614 28.9999 7.03813 28.9764 6.92563 28.9344L2.17405 27.0327C1.23055 26.6831 1.00004 26.3821 1.00004 25.501V4.49417C1.00004 3.61306 1.23055 3.31256 2.18606 2.95849L6.91614 1.06629C7.03813 1.02029 7.15562 0.996795 7.26513 0.996795C7.70465 0.996795 8.00014 1.39733 8.00014 1.99394V28.0023Z" fill="#7B8F9E"/>
    <path d="M10.4377 2.99403H17.5004C18.3274 2.99403 19.0004 3.66711 19.0004 4.49419V11.995C19.0004 12.271 19.2239 12.495 19.5004 12.495C19.7769 12.495 20.0004 12.271 20.0004 11.995V4.49419C20.0004 3.11556 18.8789 1.9939 17.5003 1.9939H10.4377C10.1618 1.9939 9.93774 2.21792 9.93774 2.49393C9.93774 2.76994 10.1618 2.99403 10.4377 2.99403Z" fill="#7B8F9E"/>
    <path d="M19.5004 17.4956C19.2239 17.4956 19.0004 17.7196 19.0004 17.9956V25.4965C19.0004 26.3235 18.3274 26.9966 17.5004 26.9966H10.5002C10.2243 26.9966 10.0002 27.2207 10.0002 27.4967C10.0002 27.7727 10.2243 27.9967 10.5002 27.9967H17.5004C18.8789 27.9967 20.0005 26.8751 20.0005 25.4964V17.9956C20.0004 17.7196 19.7769 17.4956 19.5004 17.4956Z" fill="#7B8F9E"/>
    <path d="M29.9621 14.8043C29.9366 14.7428 29.9001 14.6878 29.8536 14.6413L24.854 9.64076C24.6584 9.44527 24.3424 9.44527 24.147 9.64076C23.9514 9.83631 23.9514 10.1523 24.147 10.3478L28.2935 14.4953H11.5002C11.2243 14.4953 11.0002 14.7193 11.0002 14.9953C11.0002 15.2713 11.2243 15.4953 11.5002 15.4953H28.2936L24.147 19.6423C23.9514 19.8379 23.9514 20.1539 24.147 20.3494C24.2445 20.4469 24.3725 20.4959 24.5005 20.4959C24.6285 20.4959 24.7565 20.4469 24.854 20.3494L29.8536 15.3493C29.9001 15.3028 29.9366 15.2479 29.9621 15.1863C30.0126 15.0644 30.0126 14.9264 29.9621 14.8043Z" fill="#7B8F9E"/>
    </svg>
    ,
    'title' : 'Logout',
    'url' : '/logout'
};
export const logo = {
    'src' : <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.4436 21.2762C9.86618 22.329 3.56279 28.4413 1.23327 31.3659C6.49523 32.7697 7.2626 33.8518 6.98854 34.2173C5.83749 34.2173 1.84991 35.6796 0 36.4108L9.66063 37.0688C13.6071 36.7178 15.1418 31.6584 15.4159 29.1725C39.9169 25.663 41.5202 15.1346 39.2592 10.3091C39.0947 17.679 32.7502 18.9365 29.5985 18.6441C29.2697 18.2931 30.9688 16.1582 31.8595 15.1346C29.53 15.3539 24.5421 15.7926 23.2266 15.7926C21.9111 15.7926 19.8009 14.769 18.9102 14.2572L16.4436 21.2762Z" fill="#7B8F9E"/>
    <path d="M39.6703 19.0828C33.2984 28.9531 16.8547 30.0499 16.4436 30.0499C16.4436 33.5593 13.8401 36.1914 12.5383 37.0688C32.7639 38.4726 39.0536 25.663 39.6703 19.0828Z" fill="#7B8F9E"/>
    <path d="M29.5985 34.8754C28.283 36.1037 25.6247 36.8495 24.4599 37.0688C25.6932 38.2386 28.2008 40.4467 28.3653 39.9202C28.5297 39.3938 32.4077 35.899 34.3261 34.2173L29.5985 34.8754Z" fill="#7B8F9E"/>
    <path d="M38.2314 11.4058C37.821 9.50777 34.7468 6.37069 25.7353 8.98078C25.7213 8.98518 25.7073 8.98926 25.6932 8.99302C25.7072 8.98893 25.7213 8.98485 25.7353 8.98078C26.8099 8.64308 27.5555 6.40905 22.1989 0C28.2967 1.60851 40.0402 6.14157 38.2314 11.4058Z" fill="#7B8F9E"/>
    </svg>
};
