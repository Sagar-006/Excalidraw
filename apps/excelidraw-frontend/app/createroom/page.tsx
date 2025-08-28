// 'use client'

import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"

export default function createRoom ()  {
    return <div>
        <Input className="w-[300px]" type="text" placeholder="room-name"/>
        <Button size="default" onClick={() => }>Create-Room</Button>
    </div>
}