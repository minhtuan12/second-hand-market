import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {Avatar, Flex, Select, Skeleton, Upload} from "antd";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {Address, SelectOption, UserProfile} from "../../../../../../utils/types";
import {useAuthUser} from "../../../../../hooks/useAuthUser";
import {
    beforeUpload,
    getBase64,
    getNotification,
    handleFormatCityData,
    handleRemoveVietnameseTones
} from "../../../../../../utils/helper";
import {EditOutlined, UserOutlined} from "@ant-design/icons";
import {requestUpdateAvatar, requestUpdateProfile} from "@/api/profile";
import {SERVER_ERROR_MESSAGE} from "../../../../../../utils/constants";
import {handleGetProfile} from "@/actions/auth";
import {requestGetWards, useFetchRegions} from "@/api/location";
import {setRegions} from "@/store/slices/app";
import {RootState} from "@/store/configureStore";
import ErrorMessage from "@/components/ErrorMessage";

export default function AccountTab({handleConfirmUpdateProfile}: {
    handleConfirmUpdateProfile: (user: UserProfile) => void
}) {
    // @ts-ignore
    const {authUser} = useAuthUser()
    const [accountData, setAccountData] = useState<UserProfile | null>(null)
    const [avatarUrl, setAvatarUrl] = useState<string | ArrayBuffer | null>(null);
    const [loadingUpdateAvatar, setLoadingUpdateAvatar] = useState(false)
    const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false)
    const [cityOptions, setCityOptions] = useState<SelectOption[]>([])
    const [districtOptions, setDistrictOptions] = useState<SelectOption[]>([])
    const [wardOptions, setWardOptions] = useState<SelectOption[]>([])
    const [address, setAddress] = useState<Address>({
        city: null,
        district: null,
        ward: null,
        detail: ''
    })
    const [submitError, setSubmitError] = useState<{ name: string, address: string }>({
        name: '',
        address: ''
    })
    const regions = useSelector((state: RootState) => state.app.regions)
    const dispatch = useDispatch()

    /* get regions */
    const {data: regionsData, error, isLoading: loadingGetRegions} = useFetchRegions(() => {
        getNotification('error', 'Không thể lấy thông tin địa chỉ các vùng')
    })

    useEffect(() => {
        if (regionsData) {
            dispatch(setRegions(regionsData?.regions))
            setCityOptions(handleFormatCityData(regionsData?.regions, 'city'))
        }
    }, [dispatch, regionsData])

    useEffect(() => {
        if (address.district) {
            requestGetWards(address.district)
                .then(res => {
                    setWardOptions(res.data?.wards?.map((item: any): SelectOption => {
                        return {
                            label: item.name,
                            value: String(item.id)
                        }
                    }))
                })
                .catch(() => {
                    getNotification('error', 'Không thể lấy thông tin phường, xã, thị trấn')
                })
        }
    }, [address.district])

    useEffect(() => {
        //TODO: set address state
        setAccountData(authUser as UserProfile)
        setAvatarUrl(authUser?.avatar || null)
    }, [authUser])

    const handleChangeAccountData = (key: string, value: string) => {
        if (key === 'firstname' || key === 'lastname') {
            setSubmitError({
                ...submitError,
                name: ''
            })
        }
        // @ts-ignore
        setAccountData({...accountData, [key]: value})
    }

    const handleChangeAddress = (key: string, value: string) => {
        setSubmitError({
            ...submitError,
            address: ''
        })

        if (key === 'city' && value) {
            const city = regions?.find((item: any): boolean => Object.keys(item)?.[0] === value)
            setDistrictOptions(handleFormatCityData(city[value]?.area, 'district'))
        }
        if (!value) {
            switch (key) {
                case 'city':
                    setAddress({
                        ...address,
                        city: null,
                        district: null,
                        ward: null,
                        detail: ''
                    })
                    break;
                case 'district':
                    setAddress({
                        ...address,
                        district: null,
                        ward: null,
                        detail: ''
                    })
                    break;
                case 'ward':
                    setAddress({
                        ...address,
                        ward: null,
                        detail: ''
                    })
                    break;
            }
        } else {
            setAddress({
                ...address,
                [key]: String(value)
            })
        }
    }

    const handleChangeAvatar = (info: any) => {
        getBase64(info.file.originFileObj, (url): void => {
            setAvatarUrl(url);
            // @ts-ignore
            setAccountData({
                ...accountData,
                avatar: info.file.originFileObj
            })
        });
    };

    const handleUpdateAvatar = async () => {
        setLoadingUpdateAvatar(true)
        await requestUpdateAvatar(accountData?.avatar)
            .then(async () => {
                handleGetProfile().then(res => handleConfirmUpdateProfile(res))
                getNotification('success', 'Cập nhật ảnh thành công')
            })
            .catch(err => {
                getNotification('error', SERVER_ERROR_MESSAGE)
            })
            .finally(() => {
                setLoadingUpdateAvatar(false)
            })
    }

    const handleSubmitUpdateProfile = () => {
        /* Validation */
        let isError: boolean = false
        if (!accountData?.firstname || !accountData.lastname) {
            isError = true
            setSubmitError({
                ...submitError,
                name: 'Họ và tên không được bỏ trống!'
            })
        }
        if (address.city && (!address.district || !address.ward || !address.detail)) {
            isError = true
            setSubmitError({
                ...submitError,
                address: 'Vui lòng điền đầy đủ thông tin địa chỉ!'
            })
        }

        if (!isError) {
            const data = {
                firstname: accountData?.firstname,
                lastname: accountData?.lastname,
                phone: accountData?.phone,
                ...address
            }

            setLoadingUpdateProfile(true)
            requestUpdateProfile(data)
                .then(async (res) => {
                    handleGetProfile().then(res => handleConfirmUpdateProfile(res))
                    getNotification('success', 'Cập nhật thành công')
                })
                .catch(err => {
                    getNotification('error', SERVER_ERROR_MESSAGE)
                })
                .finally(() => {
                    setLoadingUpdateProfile(false)
                })
        }
    }

    return <div style={{fontFamily: 'Helvetica, Arial, Roboto, sans-serif'}}>
        <div className={'font-semibold text-[19px] tracking-wide'}>Thông tin tài khoản</div>
        <Flex gap={12} className={'mt-5'} vertical>
            {
                accountData ? <div className={'px-6'}>
                    <Flex gap={20} justify={'space-between'} className={'mt-5'} wrap>
                        <Flex vertical align={'center'} className={'w-full 2xl:w-1/4'}>
                            <div
                                className={'w-fit border-[3px] rounded-[50%] h-fit hover:border-dashed cursor-pointer'}>
                                <Upload
                                    name="avatar"
                                    customRequest={({file, onSuccess}) => {
                                        setTimeout(() => {
                                            onSuccess && onSuccess("ok");
                                        }, 0);
                                    }}
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChangeAvatar}
                                >
                                    <div className={'relative'}>
                                        <Avatar
                                            src={avatarUrl ? avatarUrl : (accountData.avatar || avatarUrl)}
                                            icon={!avatarUrl ? <UserOutlined style={{fontSize: '60px'}}/> : ''}
                                            className={'w-[170px] h-[170px]'}
                                        />
                                        <div
                                            className={'absolute top-[70%] right-[-3px] h-[2rem] w-[2rem] bg-[#f9f9f9] rounded-[50%] flex items-center justify-center'}>
                                            <EditOutlined/>
                                        </div>
                                    </div>
                                </Upload>
                            </div>
                            <Flex vertical gap="small">
                                <Button
                                    loading={loadingUpdateAvatar}
                                    type="primary"
                                    disabled={!_.isObject(accountData?.avatar)}
                                    onClick={handleUpdateAvatar}
                                    size={'large'}
                                    className={`main-btn-primary flex justify-center items-center font-semibold mt-10`}
                                    block
                                >
                                    Cập nhật ảnh đại diện
                                </Button>
                            </Flex>
                        </Flex>

                        <Flex className={'w-full 2xl:w-1/4'} gap={46} vertical>
                            <div className={'w-full'}>
                                <div className={'label-wrap !text-[16px] font-[600] mb-1'}>
                                    Họ và tên <span className={'text-[red]'}>*</span>
                                </div>
                                <div className={'flex flex-col gap-[15px] justify-between'}>
                                    <Input
                                        rootClassName={'h-[45px] w-full'}
                                        size={"large"}
                                        placeholder={'Nhập họ'}
                                        value={accountData?.firstname}
                                        onChange={e => handleChangeAccountData('firstname', e.target.value)}
                                    />
                                    <Input
                                        rootClassName={'h-[45px] w-full'}
                                        size={"large"}
                                        placeholder={'Nhập tên'}
                                        value={accountData?.lastname}
                                        onChange={e => handleChangeAccountData('lastname', e.target.value)}
                                    />
                                </div>
                                {submitError.name ?
                                    <ErrorMessage className={'absolute'} message={submitError.name}/> : ''}
                            </div>

                            <div className={'input-wrap'}>
                                <div className={'label-wrap !text-[16px] font-[600] mb-1'}>
                                    Số điện thoại
                                </div>
                                <Input
                                    rootClassName={'h-[45px]'}
                                    className={'w-full'}
                                    size={"large"}
                                    placeholder={'Nhập số điện thoại'}
                                    value={accountData?.phone}
                                    onChange={e => handleChangeAccountData('phone', e.target.value)}
                                />
                            </div>
                        </Flex>

                        <Flex vertical className={'w-full 2xl:w-1/4'}>
                            <div className={'input-wrap'}>
                                <div className={'label-wrap !text-[16px] font-[600] mb-1'}>
                                    Địa chỉ
                                </div>
                                <Flex vertical gap={15} className={'main-select'}>
                                    <Select
                                        loading={loadingGetRegions}
                                        showSearch
                                        allowClear
                                        value={address.city}
                                        onChange={e => handleChangeAddress('city', e)}
                                        placeholder={'Chọn tỉnh, thành phố'}
                                        options={cityOptions}
                                        optionFilterProp={'label'}
                                        filterOption={(inputValue, option) =>
                                            handleRemoveVietnameseTones(option?.label?.toLowerCase()).includes(
                                                handleRemoveVietnameseTones(inputValue?.toLowerCase())
                                            )
                                        }
                                    />

                                    <Select
                                        showSearch
                                        allowClear
                                        disabled={_.isEmpty(address.city)}
                                        value={address.district}
                                        onChange={e => handleChangeAddress('district', e)}
                                        placeholder={'Chọn quận, huyện, thị xã'}
                                        options={districtOptions}
                                        optionFilterProp={'label'}
                                        filterOption={(inputValue, option) =>
                                            handleRemoveVietnameseTones(option?.label?.toLowerCase()).includes(
                                                handleRemoveVietnameseTones(inputValue?.toLowerCase())
                                            )
                                        }
                                    />

                                    <Select
                                        showSearch
                                        allowClear
                                        disabled={_.isEmpty(address.district)}
                                        value={address.ward}
                                        onChange={e => handleChangeAddress('ward', e)}
                                        placeholder={'Chọn phường, xã, thị trấn'}
                                        options={wardOptions}
                                        optionFilterProp={'label'}
                                        filterOption={(inputValue, option) =>
                                            handleRemoveVietnameseTones(option?.label?.toLowerCase()).includes(
                                                handleRemoveVietnameseTones(inputValue?.toLowerCase())
                                            )
                                        }
                                    />

                                    <Input
                                        disabled={_.isEmpty(address.ward)}
                                        rootClassName={`h-[45px]`}
                                        className={'w-full'}
                                        size={"large"}
                                        placeholder={'Nhập địa chỉ cụ thể'}
                                        value={address.detail}
                                        onChange={e => handleChangeAddress('detail', e.target.value)}
                                    />
                                </Flex>
                            </div>
                            {submitError.address ?
                                <ErrorMessage className={'!mt-1.5'} message={submitError.address}/> : ''}
                        </Flex>
                    </Flex>

                    <div className={'mt-6 flex justify-end'}>
                        <Button size={"large"} type={'primary'} onClick={handleSubmitUpdateProfile}
                                loading={loadingUpdateProfile}>
                            Lưu thông tin
                        </Button>
                    </div>
                </div> : <Skeleton loading={true}/>
            }
        </Flex>
    </div>
}
