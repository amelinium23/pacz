package com.pacz.cinema.utils;

import com.pacz.cinema.model.entities.*;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Component
public class ExposeEntityIdRestMvcConfiguration implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Ticket.class);
        config.exposeIdsFor(Film.class);
        config.exposeIdsFor(Group.class);
        config.exposeIdsFor(Normal.class);
        config.exposeIdsFor(Discounted.class);
        config.exposeIdsFor(ScreeningRoom.class);
        config.exposeIdsFor(Screening.class);
    }
}
