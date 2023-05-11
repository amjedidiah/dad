// You are also able to use a 3rd party theme this way:
import { ModeTheme } from '@/context/mode/types'
import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme extends ModeTheme {}
}