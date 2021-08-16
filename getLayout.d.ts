type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}