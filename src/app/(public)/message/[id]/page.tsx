"use client";

import { Button } from "@/src/components/ui/button";
import { PlusCircle, SendHorizonal } from "lucide-react";
import Image from "next/image";

const page = () => {
  return (
    <main className="mt-30 flex-1 flex overflow-hidden w-full max-w-screen-2xl mx-auto bg-surface-container-low">
      <aside className="w-80 bg-surface shrink-0 flex flex-col border-r border-surface-dim/30 z-10 shadow-[4px_0_24px_rgba(48,51,46,0.03)]">
        <div className="p-6 pb-4">
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">
            Messages
          </h2>
          <div className="relative">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
              data-icon="search"
            >
              search
            </span>
            <input
              className="w-full bg-surface-container-highest border-none rounded-md py-3 pl-10 pr-4 text-sm font-body text-on-surface placeholder:text-on-surface-variant focus:ring-0 focus:outline-none transition-shadow"
              placeholder="Search conversations..."
              style={{
                boxShadow:
                  "inset 0 0 0 1px transparent; transition: box-shadow 0.2s;",
              }}
              type="text"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-[0_4px_24px_rgba(48,51,46,0.04)] flex items-center gap-4 cursor-pointer relative overflow-hidden group transition-all duration-200">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="relative w-12 h-12 shrink-0">
              <Image
                alt="Patagonia"
                className="w-full h-full object-cover rounded-md"
                data-alt="Majestic mountain peaks of Patagonia under a clear blue sky with snow-capped ridges"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkibezYqnUuFwp2YnMNCigTGzj1vIQ5pAsCh4wEsyrcU0c1VxsSMh3eyD0bb2eK4zmzipGatSA8k7k5F_C-YzfsBInkniFXFLDFz3nD6sQUB-x0u98PZ7M0eNMXfrevsW_6EOzh-inNPWsfTgJ-8rQX-H9xeswd7l_zt-RXdnAy885_5m8AbcLojfcNe9M-Q_Q-25TohxlWVi9HJ2dlhrX-6kEKI-i6qyun_A78qFCmFeFm72ulgwbzJcebjjn9Q47OR0S9anv2WA"
                width={100}
                height={100}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-surface-container-lowest rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-headline font-semibold text-on-surface text-sm truncate">
                  Patagonia Expedition
                </h3>
                <span className="text-[10px] text-primary font-medium">
                  Now
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-body truncate">
                Elena: We need to pack extra thermal layers.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl hover:bg-surface-container transition-colors flex items-center gap-4 cursor-pointer group">
            <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 bg-surface-container-highest">
              <Image
                alt="Elena"
                className="w-full h-full object-cover"
                data-alt="Portrait of a smiling man with a beard wearing a casual jacket outdoors"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfTRnTCaO-I_b9Li20SxvpXnGhc8FoXcoXNl4ak4c_aXS_hl7lEabQxQvo_83Jbqh3PDT67F-N6W2yUgtVrS8mwDWjPeLVScdpJop-mlTqG5DyKSpu-5_a4sOg8yHK99uy9jJPcdv3fLIimUMy0vxqH_9B8gjZyNk5loQVjvONE57yBe0tlVZYyOROF-lk3S33WA1Lf--mrDnuE77KAJdrKEtiGp09PLZseUXLlTQrLaARooI99l_pThnQPVRQ0BC-AhqOV91AUH0"
                width={100}
                height={100}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-headline font-semibold text-on-surface text-sm truncate">
                  Marcus Chen
                </h3>
                <span className="text-[10px] text-on-surface-variant font-medium">
                  2h
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-body truncate">
                Got the permits for Yosemite.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl hover:bg-surface-container transition-colors flex items-center gap-4 cursor-pointer group">
            <div className="relative w-12 h-12 shrink-0 grid grid-cols-2 grid-rows-2 gap-0.5 rounded-md overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                data-alt="Portrait of woman"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe3zj-Ga-eTYjj2sRNYDq953t-cKmcQMgs9a607nUMjr5gv47-jrf0QMA1Sl8L9_g7stwEe4HNI8TALBNzPevNrdPB3qyXb1RicftTDRQP94P_o3bxvGPlb6TV5kJSSg71AVSlIKC_0pbTsXhj345HMd_BoIxU6OFrrDcBETeiXj5Y3XcibxfSrghzuOHGh0AP6qepj3j-AUyJYn_6L4kmhJ6vKHhgTsUL8AhRy4geVX2OXUz04p7r9Z7fxcr8zVcNxJpdg8hWPLM"
                width={100}
                height={100}
                alt=""
              />
              <Image
                className="w-full h-full object-cover"
                data-alt="Portrait of man"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM_nanThDbiYC3voy2N2LqIWw8JS6J3E5Ptox_huGstU4Knpg0P17hP_tbEeysH7GpZGygriU-edgG3O6TcqsWthr9SyHLRYlQzDD7R_oPXKKdksL_zVvQQns4tyT8UgVN4Fk84OtfWq0wXNAAhurVHKJ6Y6zP46wzxPmOVAx_f6nhDYtWLRtQHqZQ_3B_YwLzrN0p2kehq0DoB9s-p7wjUlToynSatJN1IEeYZOxGvOS_2MVScSAHjWnWmKwntB53Zp2WMBGuE9I"
                width={100}
                height={100}
                alt=""
              />
              <Image
                className="w-full h-full object-cover"
                data-alt="Portrait of woman smiling"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbF4TLoQ_J7lGjFZdzXdsEmQtLUV1bQa2PJWGAVFPN0IMUBUFKnPK-1a3DLCsfRtGO7ygZkAJnzdyYheT3a6IqEP1Xdl9VWvKt95MNF8HOjS0zcNPYjM2WBfdn7OCBsv6o4wzRjO0tyAzBrSSxGTbmqk2_ZcOqxh9_Vy4w3HGJ76PMwyigyQfnn26fU_Ds6xB6LEFKmfSr-L1eEn4hzxh9Iu8SaEwTaJoFeuR3ujILKuyP4A-FSDGnvp3JwWIvKQI2wOn9jgHpDYc"
                width={100}
                height={100}
                alt=""
              />
              <div className="bg-primary-container flex items-center justify-center text-[10px] font-bold text-on-primary-container">
                +3
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-headline font-semibold text-on-surface text-sm truncate">
                  Alps Planning
                </h3>
                <span className="text-[10px] text-on-surface-variant font-medium">
                  Yesterday
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-body truncate">
                Sarah shared a route link.
              </p>
            </div>
          </div>
        </div>
      </aside>
      <section className="flex-1 flex flex-col  justify-end">
        <div className="p-6 bg-surface-container-low border-t border-surface-dim/20 shrink-0">
          <div className="bg-surface rounded-xl flex items-end shadow-sm p-2 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <Button variant="ghost" size="icon">
              <PlusCircle />
            </Button>
            <textarea
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-sm font-body text-on-surface placeholder:text-on-surface-variant/70 max-h-32"
              placeholder="Type a message..."
              rows={1}
            ></textarea>
            <div className="flex items-center gap-1 p-2 shrink-0">
              <Button size="lg" variant="default">
                <SendHorizonal />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* right section */}
      <section className="w-80 bg-surface shrink-0 flex flex-col border-l border-surface-dim/30 shadow-[-4px_0_24px_rgba(48,51,46,0.03)] z-10 overflow-y-auto">
        <div className="h-48 relative">
          <Image
            alt="Map of Patagonia"
            className="w-full h-full object-cover"
            data-alt="Topographic map view of mountainous terrain with winding trails and a prominent lake in earthy greens and browns"
            data-location="Patagonia"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0PfLQwyhvd2o_3jVhveqqHAACva0SBLgBLyfFoD0LgCX6mZNdmkFUYMt67mII4MCFV7wVslP316Hc5kWziBJKappOVEtJtou9_3Zh12VstsL8IHmAt_t_WF5gEVNY1SCBOwfXjkiFPf1A-0C5jclepQjPAaZqQoalKwEBhpimsGG0PJhbq4xmx74uFV1AASp02b5DN4qGIptUr1JzYo9VPzC4dXRIQ_fMz32GPUv2ag4MgKwaOkLjKTfdTTThd6-l4M8gGkPps88"
            width={100}
            height={100}
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent"></div>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-tertiary/90 text-on-tertiary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2 inline-block shadow-sm">
              Upcoming Trip
            </span>
            <h3 className="font-headline font-bold text-lg text-on-surface leading-tight">
              W Trek, Patagonia
            </h3>
          </div>
        </div>
        <div className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-1">
              <span
                className="material-symbols-outlined text-primary text-[20px]"
                data-icon="calendar_month"
              >
                calendar_month
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium mt-1">
                Dates
              </span>
              <span className="text-sm font-bold text-on-surface font-headline">
                Oct 12 - 18
              </span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-1">
              <span
                className="material-symbols-outlined text-secondary text-[20px]"
                data-icon="hiking"
              >
                hiking
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium mt-1">
                Difficulty
              </span>
              <span className="text-sm font-bold text-on-surface font-headline">
                Challenging
              </span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <h4 className="font-headline font-bold text-sm text-on-surface">
                Expedition Team
              </h4>
              <span className="text-[10px] text-primary font-bold cursor-pointer hover:underline">
                View All
              </span>
            </div>
            <div className="flex -space-x-3">
              <Image
                alt="User"
                className="w-10 h-10 rounded-md border-2 border-surface object-cover relative z-40"
                data-alt="Portrait of woman"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7WF3hxHnKB_mspQXh3PUDavpMeuaPsjl5ZSNsLuJEDqlh-ogW2fGcCcIbadWYu-0b6DpoT2DdoAwt-nR8v23hbX7bi0voPW49Yuqrh1k5uLc42PWKfRnT7FmqNafOntZI2FUlbGkADcIrdiQKHWKwg1eizqsHXfbKSl3MVcw1V5N3UwOFnwAOiM8FnKOZgfxznnXa-l2siADjL9CwaRQu6rUA1R2W5yVDzMuPRcS3_r63xEwaC-lOE-LpJt9RMk0GbQC6ZyaaNqA"
                width={100}
                height={100}
              />
              <Image
                alt="Elena"
                className="w-10 h-10 rounded-md border-2 border-surface object-cover relative z-30"
                data-alt="Portrait of Elena"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUKl6MPhUjLgNBr2aLRRWUdmoMFRV6apygZSNdtirCLD0YU5V9fQgV0gn6l3oQkHeZbAYqY3C0fF44dtGYnRxhUXjubQzsWFHzP6wv0fDxbxQ-eBxBEsxswu08P2cxjCmtE9gvrYqG48rE-senmD5s9WLYFnjxQEk78yzWNq_6XJVNui24w9sL7wd3qZZSbO8gbFnxAV_MmogI0LsBIvCFwERHEgQ4bjYGH0-oVEC4v_ChdOmI_3Xbd1nayKXX7irAv6UytfdxTGk"
                width={100}
                height={100}
              />
              <Image
                alt="David"
                className="w-10 h-10 rounded-md border-2 border-surface object-cover relative z-20"
                data-alt="Portrait of David"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDckWVRNA82vHQe9U0i3TAUki0pvmBnjqzUzReITs-m_7jcZ9h4dQMR6Y5Q8RYNHjW5ImUQXABHnpHSWE9o0RjycywTwN01CbUBGgUgNlo7KA2RsZKguGaUzcaviMl_i60wDRzxzO-oYrL8PO5dAnUz81bALZUVs7Z2kNtTBmv1jmZiFos5_pgjvEzjrkCURGWMRlSfeH8L5qS52mE6YOnvb3PezTmd3VcqiJc6kg3WOssXR_VBa-iZy0iMFUuB2cqSTdXYZL2IR3o"
                width={100}
                height={100}
              />
              <Image
                alt="Sarah"
                className="w-10 h-10 rounded-md border-2 border-surface object-cover relative z-10"
                data-alt="Portrait of man"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC4r6xgZRa95dKVCdgJOCmynhshdZkTjJS7LjI0-CcshipWGV_9jGvN9KKiAN7zwBOHmeB9R9sjl_n-VmYzPSndQzvIes0l23tD1H23KFM_SR0MPYVFIoOril6pYA7XZQ7SX0m__gUPREUCerKpPNs8KhJPxpR7QON1cP6xUxSpThLWElL-DZTDqRb9Ga29js-x6rSUn2UMe6dvJLRvE6xwnjxRQrglNlghY19nstUAmp7ufv-_53rAU5HpuJY-QzRxT5YhNMgWuA"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm text-on-surface mb-4">
              Resources
            </h4>
            <div className="space-y-3">
              <a
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container transition-colors group"
                href="#"
              >
                <div className="w-8 h-8 rounded-md bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="description"
                  >
                    description
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-on-surface block">
                    Itinerary PDF
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Added 2 days ago
                  </span>
                </div>
              </a>
              <a
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container transition-colors group"
                href="#"
              >
                <div className="w-8 h-8 rounded-md bg-tertiary-container text-on-tertiary-container flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="checklist"
                  >
                    checklist
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-on-surface block">
                    Gear Checklist
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Shared by Elena
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
